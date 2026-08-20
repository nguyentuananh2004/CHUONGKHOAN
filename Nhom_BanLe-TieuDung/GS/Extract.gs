function parseRssArticles(xmlText, sourceName, cat) {
  try {
    var doc = XmlService.parse(xmlText);
    var root = doc.getRootElement();
    var channel = root.getChild("channel");
    if (!channel) return [];
    var items = channel.getChildren("item");
    var entries = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var link = getChildText(item, "link");
      if (!link) {
        var linkEl = item.getChild("link");
        if (linkEl) link = linkEl.getText();
      }
      if (!link) continue;
      var title = stripHtmlTags(getChildText(item, "title") || "");
      var desc = stripHtmlTags(getChildText(item, "description") || "");
      var summary = desc.length > 300 ? desc.slice(0, 300) : desc;
      var dateStr = getChildText(item, "pubDate") || getChildText(item, "dc:date") || "";
      entries.push({
        link: link.trim(),
        source: "RSS:" + sourceName,
        category: cat,
        title: title,
        summary: summary,
        datetime_public: normalizeDate(dateStr),
        status: "new"
      });
    }
    return entries;
  } catch (e) {
    logError("XmlService parse error: " + e.message + " for " + sourceName);
    return [];
  }
}

function getChildText(parent, name) {
  try {
    if (name.indexOf(":") > 0) {
      var parts = name.split(":");
      var ns = XmlService.getNamespace(parts[0]);
      var el = parent.getChild(parts[1], ns);
      return el ? el.getText() : "";
    }
    var child = parent.getChild(name);
    return child ? child.getText() : "";
  } catch (e) {
    return "";
  }
}

function indexRssSource(rssEntry, existingLinks, ss) {
  var name = rssEntry.name;
  var cat = rssEntry.cat || "";
  var xmlText = fetchUrl(rssEntry.url);
  if (!xmlText) return [0, 0];
  var entries = parseRssArticles(xmlText, name, cat);
  var found = entries.length;
  var added = 0;
  for (var i = 0; i < entries.length; i++) {
    var link = entries[i].link;
    if (existingLinks[link]) continue;
    existingLinks[link] = true;
    added += accumulateEntry(entries[i]);
  }
  logRss(name, rssEntry.url, found);
  return [found, added];
}

function extractCafefArticles(html, domain, name, cat) {
  var entries = [];
  var itemRegex = /<div\s+class\s*=\s*["']tlitem["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  var match;
  while ((match = itemRegex.exec(html)) !== null) {
    var block = match[1];
    var href = "";
    var linkMatch = block.match(/<a[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/i);
    if (linkMatch) href = linkMatch[1];
    if (!href) continue;
    var link = resolveUrl(href, domain);
    var title = "";
    var titleMatch = block.match(/<a[^>]*>([\s\S]*?)<\/a>/i);
    if (titleMatch) title = stripHtmlTags(titleMatch[1]);
    var dateStr = "";
    var timeMatch = block.match(/<span[^>]*class\s*=\s*["']time["'][^>]*title\s*=\s*["']([^"']+)["']/i);
    if (timeMatch) dateStr = timeMatch[1];
    entries.push({
      link: link, source: "API:" + name, category: cat,
      title: title, datetime_public: dateStr, status: "new"
    });
  }
  return entries;
}

function extractCafebizArticles(html, domain, name, cat) {
  var entries = [];
  var itemRegex = /<li\s+class\s*=\s*["']item["'][^>]*>([\s\S]*?)<\/li>/gi;
  var match;
  while ((match = itemRegex.exec(html)) !== null) {
    var block = match[1];
    var href = "";
    var linkMatch = block.match(/<a[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/i);
    if (linkMatch) href = linkMatch[1];
    if (!href) continue;
    var link = resolveUrl(href, domain);
    var title = "";
    var titleMatch = block.match(/<a[^>]*>([\s\S]*?)<\/a>/i);
    if (titleMatch) title = stripHtmlTags(titleMatch[1]);
    var dateStr = "";
    var timeMatch = block.match(/<div\s+class\s*=\s*["']time["'][^>]*title\s*=\s*["']([^"']+)["']/i);
    if (timeMatch) dateStr = timeMatch[1];
    entries.push({
      link: link, source: "API:" + name, category: cat,
      title: title, datetime_public: dateStr, status: "new"
    });
  }
  return entries;
}

function extractVietnamnetArticles(data, name, cat) {
  var entries = [];
  var articles = data && data.data && data.data.model && data.data.model.articles;
  if (!articles) return entries;
  for (var i = 0; i < articles.length; i++) {
    var a = articles[i];
    var link = a.detailUrl || "";
    if (!link) continue;
    var fullLink = link.indexOf("/") === 0 ? "https://vietnamnet.vn" + link : link;
    entries.push({
      link: fullLink, source: "API:" + name, category: cat,
      title: a.title || "", datetime_public: a.publishDate || "", status: "new"
    });
  }
  return entries;
}

function apiBuildUrl(source, page) {
  if (source.type === "cafef") {
    return source.domain + "/timelinelist/" + source.zone_id + "/" + page + ".chn";
  }
  if (source.type === "cafebiz") {
    return source.domain + "/timelinelist/" + source.zone_id + "/" + page + ".htm";
  }
  return "";
}

function apiFetch(source, page) {
  if (source.type === "vietnamnet") {
    var payload = {
      WebsiteId: "000003", PageId: "9b31d12ab91146ca8153dbdb6dfe3d29",
      ComponentId: "COMPONENT002545", CategoryId: source.category_id,
      PageSize: 50, PageIndex: page
    };
    try {
      var resp = UrlFetchApp.fetch("https://vietnamnet.vn/newsapi/CategoryCustom/Gets", {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        headers: HTTP_HEADERS,
        muteHttpExceptions: true,
        timeoutSeconds: REQUEST_TIMEOUT
      });
      if (resp.getResponseCode() >= 200 && resp.getResponseCode() < 300) {
        return JSON.parse(resp.getContentText("UTF-8"));
      }
    } catch (e) {
      return null;
    }
    return null;
  }
  var html = fetchUrl(apiBuildUrl(source, page));
  return html;
}

function apiExtract(source, data, page) {
  var name = source.name;
  var cat = source.cat || "";
  if (source.type === "cafef") {
    return extractCafefArticles(data, source.domain, name, cat);
  }
  if (source.type === "cafebiz") {
    return extractCafebizArticles(data, source.domain, name, cat);
  }
  if (source.type === "vietnamnet") {
    if (!data) return [];
    return extractVietnamnetArticles(data, name, cat);
  }
  return [];
}

function indexApiSource(source, existingLinks, ss, recurse) {
  var name = source.name;
  var t = source.type;
  var totalAdded = 0;
  var page = t === "vietnamnet" ? 0 : 1;
  var consecutiveEmpty = 0;
  var maxEmpty = t === "cafef" ? 3 : 1;
  var found = 0;

  for (var iter = 0; iter < 100; iter++) {
    var data = apiFetch(source, page);
    if (data === null || data === undefined) {
      break;
    }
    var entries = apiExtract(source, data, page);
    found += entries.length;
    if (!entries || entries.length === 0) {
      consecutiveEmpty++;
      if (consecutiveEmpty >= maxEmpty) break;
    } else {
      consecutiveEmpty = 0;
      for (var i = 0; i < entries.length; i++) {
        var link = entries[i].link;
        if (existingLinks[link]) continue;
        existingLinks[link] = true;
        totalAdded += accumulateEntry(entries[i]);
      }
    }
    if (!recurse) break;
    page++;
    if (page % 50 === 0 && totalAdded) {
      logInfo("API " + name + ": page " + page + " -> " + totalAdded + " articles");
    }
    Utilities.sleep(150);
    if (ScriptApp.getRemainingTime() < 30) break;
  }
  return [found, totalAdded];
}

function getChildTextWithNs(parent, name, ns) {
  try {
    var child = ns ? parent.getChild(name, ns) : parent.getChild(name);
    return child ? child.getText() : "";
  } catch (e) {
    return "";
  }
}

function parseSitemapArticles(xmlText, sourceName, cat, patternStr) {
  try {
    var doc = XmlService.parse(xmlText);
    var root = doc.getRootElement();
    
    var ns = root.getNamespace();
    if (!ns || !ns.getURI()) {
      ns = XmlService.getNamespace("http://www.sitemaps.org/schemas/sitemap/0.9");
    }

    var urls = root.getChildren("url", ns);
    if (!urls || urls.length === 0) urls = root.getChildren("url");
    var entries = [];
    var pattern = patternStr ? new RegExp(patternStr, "i") : null;

    for (var i = 0; i < urls.length; i++) {
      var urlEl = urls[i];
      var loc = getChildTextWithNs(urlEl, "loc", ns) || getChildTextWithNs(urlEl, "loc", null);
      if (!loc) continue;
      
      if (pattern && !pattern.test(loc)) continue;

      var lastmod = getChildTextWithNs(urlEl, "lastmod", ns) || getChildTextWithNs(urlEl, "lastmod", null);

      entries.push({
        link: loc.trim(),
        source: "SITEMAP:" + sourceName,
        category: cat,
        title: "",
        datetime_public: normalizeDate(lastmod || ""),
        status: "new"
      });
    }
    return entries;
  } catch (e) {
    logWarn("XmlService parse error for sitemap " + sourceName + ": " + e.message);
    return [];
  }
}

function indexSitemapSource(source, existingLinks, ss) {
  var name = source.name;
  var cat = source.cat || "";
  var patternStr = source.url_pattern || "";
  
  var xmlText = fetchUrl(source.url);
  if (!xmlText) return [0, 0];
  
  try {
    var doc = XmlService.parse(xmlText);
    var root = doc.getRootElement();
    var ns = root.getNamespace();
    if (!ns || !ns.getURI()) {
      ns = XmlService.getNamespace("http://www.sitemaps.org/schemas/sitemap/0.9");
    }
    
    var sitemaps = root.getChildren("sitemap", ns);
    if (!sitemaps || sitemaps.length === 0) sitemaps = root.getChildren("sitemap");
    
    var totalAdded = 0;
    var found = 0;
    
    if (sitemaps && sitemaps.length > 0) {
      var childSitemaps = [];
      for (var j = 0; j < sitemaps.length; j++) {
         var loc = getChildTextWithNs(sitemaps[j], "loc", ns) || getChildTextWithNs(sitemaps[j], "loc", null);
         if (loc) childSitemaps.push(loc);
      }
      
      if (childSitemaps.length > 12) {
         childSitemaps = childSitemaps.slice(0, 12);
      }
      
      for (var k = 0; k < childSitemaps.length; k++) {
         var childXml = fetchUrl(childSitemaps[k]);
         if (childXml) {
           var entries = parseSitemapArticles(childXml, name, cat, patternStr);
           found += entries.length;
           for (var i = 0; i < entries.length; i++) {
             var link = entries[i].link;
             if (existingLinks[link]) continue;
             existingLinks[link] = true;
             totalAdded += accumulateEntry(entries[i]);
           }
         }
         Utilities.sleep(500);
      }
    } else {
      var entries = parseSitemapArticles(xmlText, name, cat, patternStr);
      found += entries.length;
      for (var i = 0; i < entries.length; i++) {
        var link = entries[i].link;
        if (existingLinks[link]) continue;
        existingLinks[link] = true;
        totalAdded += accumulateEntry(entries[i]);
      }
    }
    
    return [found, totalAdded];
  } catch (e) {
    logWarn("Error parsing sitemap source " + name + ": " + e.message);
    return [0, 0];
  }
}

