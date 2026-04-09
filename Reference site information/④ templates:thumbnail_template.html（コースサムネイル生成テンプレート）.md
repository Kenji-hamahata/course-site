<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 400px;
    height: 267px; /* 3:2 比率 */
    font-family: "Hiragino Sans", "Noto Sans JP", sans-serif;
    background: {{BG_COLOR}}; /* course_brief.mdの背景色 */
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
  }

  /* 背景テクスチャ（レンガ風など） */
  .bg-texture {
    position: absolute;
    inset: 0;
    background-image: /* SVGパターンをClaude Codeが生成 */;
    opacity: 0.15;
    pointer-events: none;
  }

  .top-area {
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 1;
  }
  .catchcopy {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    background: rgba(0,0,0,0.3);
    padding: 2px 8px;
    border-radius: 4px;
    display: inline-block;
    max-width: 220px;
  }
  .course-title {
    font-size: 26px;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.2;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    max-width: 220px;
  }
  .course-title .cross {
    color: #FFD700;
  }

  /* キャラクター（右側固定） */
  .character {
    position: absolute;
    right: 8px;
    bottom: 30px;
    width: 110px;
    /* 実際の画像パスをcourse_brief.mdで指定 */
  }

  .bottom-area {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 1;
  }

  /* ツールロゴ群 */
  .tool-logos {
    display: flex;
    gap: 6px;
    align-items: center;
    background: rgba(0,0,0,0.4);
    padding: 4px 8px;
    border-radius: 6px;
  }
  .tool-badge {
    font-size: 9px;
    font-weight: 700;
    color: #ffffff;
    background: rgba(255,255,255,0.2);
    padding: 2px 6px;
    border-radius: 3px;
    white-space: nowrap;
  }

  /* ブランドロゴ（右下） */
  .brand {
    font-size: 11px;
    font-weight: 900;
    color: #ffffff;
    background: rgba(0,0,0,0.5);
    padding: 3px 8px;
    border-radius: 4px;
  }
</style>
</head>
<body>
  <div class="bg-texture"></div>

  <div class="top-area">
    <span class="catchcopy">{{CATCHCOPY}}</span>
    <div class="course-title">{{COURSE_TITLE_HTML}}</div>
    <!-- 例: AIエージェント<span class="cross">×</span><br>LP制作 自動化 -->
  </div>

  <!-- キャラクター画像（任意） -->
  <!-- <img class="character" src="{{CHARACTER_IMG}}" /> -->

  <div class="bottom-area">
    <div class="tool-logos">
      <span class="tool-badge">{{TOOL_1}}</span>
      <span class="tool-badge">{{TOOL_2}}</span>
      <span class="tool-badge">{{TOOL_3}}</span>
      <!-- 必要に応じて追加 -->
    </div>
    <span class="brand">{{BRAND_NAME}}</span>
  </div>
</body>
</html>