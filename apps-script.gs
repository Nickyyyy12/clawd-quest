// 小 Clawd 的 Java 大陆：学习卡数据接口
// 部署成 Web 应用后，网页每 2 分钟来这里读一次学习状态卡。
// 只返回游戏需要的行，求职目标、城市、薪资等内容不会传出去。

const DOC_ID = "11LEdLWTwkvww_75tmMcLC66PchkhI1wOnuVu2hoIuYw"; // Java Backend｜00 学习状态卡

// 以这些开头的段落会被返回
const KEEP_PREFIX = ["知识点｜", "计划·", "最后更新：", "算法（力扣 Hot 100）："];
// 包含这些词的段落也会被返回（抖点、复习记录、实战任务进度）
const KEEP_WORDS = ["已知抖点：", "抽点记录：", "SE-07 综合项目核心练习已验收", "ArrayList", "独立提交"];

function doGet() {
  const text = DocumentApp.openById(DOC_ID).getBody().getText();
  const lines = text.split("\n").map(s => s.trim()).filter(l =>
    KEEP_PREFIX.some(p => l.startsWith(p)) || KEEP_WORDS.some(w => l.includes(w)));
  const body = {
    fileContent: lines.join("\n"),
    lastUpdated: DriveApp.getFileById(DOC_ID).getLastUpdated().toISOString()
  };
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
