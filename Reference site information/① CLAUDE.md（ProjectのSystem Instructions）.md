# CLAUDE.md — 講座作成マスタープロジェクト

## このProjectの目的
Claude Code を使って、オンライン講座（Addnessプラットフォーム想定）の
コンテンツ一式を自動生成するためのProjectです。

成果物は以下の3種類です：
1. **アクションマップ画像**（ホームバナー用 HTML → スクリーンショット）
2. **コースサムネイル画像**（各コースカード用 HTML → スクリーンショット）
3. **レッスン本文テキスト**（各レッスンのMarkdown原稿）

## ディレクトリ構成
```
project-root/
├── CLAUDE.md           ← このファイル
├── inputs/
│   └── course_brief.md ← 講座情報（ユーザーが記入）
├── outputs/
│   ├── action_map.html
│   ├── thumbnails/
│   │   ├── course_01.html
│   │   └── ...
│   └── lessons/
│       ├── 00_welcome.md
│       ├── 01_overview.md
│       └── ...
└── templates/
    ├── action_map_template.html
    ├── thumbnail_template.html
    └── lesson_template.md
```

## 実行コマンド
ユーザーから以下の指示が来たら、対応する処理を実行してください：

| 指示 | 実行内容 |
|---|---|
| 「アクションマップを作って」 | inputs/course_brief.md を読み込み → action_map.html を生成 |
| 「サムネイルを作って」 | inputs/course_brief.md を読み込み → thumbnails/*.html を生成 |
| 「レッスンを書いて」 | inputs/course_brief.md を読み込み → lessons/*.md を生成 |
| 「全部作って」 | 上記3つを順番に実行 |

## 品質基準（DoD）
- アクションマップ：Day数・各Dayのテーマ・メイン動詞が全て入っている
- サムネイル：キャッチコピー・コース名・ツールロゴ・ブランド名が全て入っている
- レッスン本文：7セクション（リード〜まとめ）が全て揃っている
- 全レッスンに「なぜこれをするのか？」「セルフチェック」「まとめと次のステップ」が含まれている

## 禁止事項
- course_brief.md が未記入のまま生成を始めない
- テンプレートを無視した独自構成にしない
- セルフチェックセクションを省略しない