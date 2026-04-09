# CLAUDE.md — Course Site（講座コンテンツ生成＆ホスティング）

## このプロジェクトの目的

Claude Code の実践講座を掲載・閲覧するためのサイト。
講座コンテンツ（レッスン本文・サムネイル画像用HTML・アクションマップ画像用HTML）を自動生成し、Astroで静的サイトとしてビルド・デプロイする。

---

## トリガー

| 指示 | 実行内容 |
|---|---|
| 「講座を追加して」 | course_brief.md の記入 → courses/ にフォルダ作成 → meta.yaml 生成 |
| 「レッスンを書いて」 | 指定コースの全レッスンMDを生成 → courses/{slug}/lessons/ に保存 |
| 「サムネイルを作って」 | 指定コースのサムネイルHTMLを生成 → courses/{slug}/outputs/thumbnails/ に保存 |
| 「アクションマップを作って」 | 指定コースのアクションマップHTMLを生成 → courses/{slug}/outputs/ に保存 |
| 「全部作って」 | 上記すべてを順番に実行 |
| 「ビルドして」 | `npm run build` を実行 |
| 「プレビューして」 | `npm run dev` を実行 |

---

## ディレクトリ構成

```
course-site/
├── CLAUDE.md                              ← このファイル
├── astro.config.mjs                       ← Astro設定
├── package.json
├── tsconfig.json
├── public/                                ← 静的ファイル（favicon等）
├── src/
│   ├── content.config.ts                  ← Content Collections定義
│   ├── layouts/
│   │   └── BaseLayout.astro               ← 共通レイアウト
│   ├── components/
│   │   ├── CourseCard.astro                ← コースカード
│   │   └── LessonNav.astro                ← レッスンサイドバーナビ
│   ├── styles/
│   │   └── global.css                     ← グローバルCSS
│   └── pages/
│       ├── index.astro                    ← トップページ
│       └── courses/
│           ├── index.astro                ← コース一覧ページ
│           ├── [slug].astro               ← コース詳細ページ
│           └── [slug]/[phase].astro       ← レッスンページ
├── templates/                             ← コンテンツ生成用テンプレート
│   ├── course_brief.md                    ← 講座情報入力シート（コピーして使う）
│   ├── action_map_template.html           ← アクションマップHTML雛形
│   ├── thumbnail_template.html            ← サムネイルHTML雛形
│   └── lesson_template.md                 ← レッスン本文雛形
├── courses/                               ← 講座データ（Content Collectionsのソース）
│   └── {course-slug}/
│       ├── meta.yaml                      ← 講座メタデータ（Content Collection用）
│       ├── course_brief.md                ← 講座の入力情報（生成元）
│       ├── lessons/
│       │   ├── 0-0_welcome.md             ← レッスン本文（frontmatter付きMD）
│       │   ├── 1-1_setup.md
│       │   └── ...
│       └── outputs/                       ← 画像生成用HTML（サイトには含まれない）
│           ├── action_map.html
│           └── thumbnails/
│               ├── course_01.html
│               └── ...
└── Reference site information/            ← 参考資料（モデルケース講座の情報）
```

---

## 講座追加フロー

### Step 1: course_brief.md を記入
1. `templates/course_brief.md` をコピーして `courses/{slug}/course_brief.md` に配置
2. ユーザーに内容を記入してもらう（または対話で聞き出す）

### Step 2: meta.yaml を生成
course_brief.md の内容から `courses/{slug}/meta.yaml` を生成する。
スキーマは `src/content.config.ts` の `courses` コレクション定義に準拠。

### Step 3: レッスンを生成
`templates/lesson_template.md` を元に、各フェーズのレッスンMDファイルを生成する。
- 保存先: `courses/{slug}/lessons/{phase}_{title}.md`
- frontmatter の `course` は slug と一致させる
- frontmatter の `order` は連番（0, 1, 2...）

### Step 4: サムネイル・アクションマップを生成
- `templates/thumbnail_template.html` のプレースホルダーを置換 → `courses/{slug}/outputs/thumbnails/`
- `templates/action_map_template.html` のプレースホルダーを置換 → `courses/{slug}/outputs/action_map.html`
- ブラウザで開いてスクリーンショットを撮る用途（サイト本体には含まれない）

---

## 品質基準（DoD）

- アクションマップ：Day数・各Dayのテーマ・メイン動詞が全て入っている
- サムネイル：キャッチコピー・コース名・ツールロゴ・ブランド名が全て入っている
- レッスン本文：7セクション（リード〜まとめ）が全て揃っている
- 全レッスンに「なぜこれをするのか？」「セルフチェック」「まとめと次のステップ」が含まれている
- meta.yaml が src/content.config.ts のスキーマに準拠している

---

## 禁止事項

- course_brief.md が未記入のまま生成を始めない
- テンプレートを無視した独自構成にしない
- セルフチェックセクションを省略しない
- courses/ 以外の場所にレッスンMDを置かない（Content Collectionsが読めなくなる）

---

## 技術スタック

- **フレームワーク**: Astro（静的サイト生成）
- **ホスティング**: Cloudflare Pages
- **コンテンツ管理**: Astro Content Collections（YAML + Markdown）
- **スタイリング**: CSS（Scoped + グローバル）

---

## cc-project-starter との連携

各講座は cc-project-starter で作られたプロジェクトテンプレートと対応する。
`meta.yaml` の `projectRepo` フィールドにGitHubリポジトリURLを記載することで、
コース詳細ページから直接テンプレートリポジトリへのリンクが表示される。
