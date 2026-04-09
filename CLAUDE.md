# CLAUDE.md — Course Site（講座コンテンツ生成＆ホスティング）

## このプロジェクトの目的

Claude Code の実践講座を掲載・閲覧するためのサイト。
講座コンテンツ（レッスン本文・サムネイル画像用HTML・アクションマップ画像用HTML）を自動生成し、Astroで静的サイトとしてビルド・デプロイする。

**重要**: このプロジェクトは「受講者が講座を閲覧するサイト」である。
講座の作成は常に **cc-project-starter** でプロジェクトテンプレートを作るところから始まる。
プロジェクトが完成した後に、このサイトに講座コンテンツを追加する。

---

## エコシステム全体の流れ

```
【講座作成者の作業フロー】

Step 1: cc-project-starter を Claude Code で開く
        「プロジェクト作りたい」と伝える
        → プロジェクト設計スキル（5フェーズ）でテンプレート生成
        → 例: /path/to/cc-lp/ が完成

Step 2: course-site（このプロジェクト）を Claude Code で開く
        「講座を追加して」と伝え、生成済みプロジェクトのパスを教える
        → プロジェクトの CLAUDE.md・スキル・セットアップガイドを自動読み取り
        → course_brief.md の下書きを自動生成

Step 3: course_brief.md を確認・調整

Step 4: 「全部作って」でレッスン・サムネ・アクションマップを一括生成

Step 5: 「ビルドして」→ push → Cloudflare Pages に自動デプロイ
```

---

## トリガー

| 指示 | 実行内容 |
|---|---|
| 「講座を追加して」 | プロジェクトパスを聞く → 自動読み取り → course_brief.md 下書き生成 → 確認 |
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

### Step 1: プロジェクトを読み取る
ユーザーが「講座を追加して」と言ったら、以下を聞く:
- 「cc-project-starter で作成したプロジェクトのパスを教えてください」

パスを受け取ったら、以下のファイルを **Read ツールで読み取る**:
1. `{project_path}/CLAUDE.md` — プロジェクトの目的・トリガー・ツール構成
2. `{project_path}/.claude/skills/*/SKILL.md` — スキルのワークフロー・フェーズ構成
3. `{project_path}/setup/SETUP-FOR-CC.md` — セットアップ手順（あれば）
4. `{project_path}/package.json` — 使用パッケージ（あれば）
5. `{project_path}/README.md` — プロジェクト説明（あれば）

### Step 2: course_brief.md を自動下書き生成
読み取った情報から以下を自動で埋める:
- **講座名**: CLAUDE.md のタイトルから
- **slug**: プロジェクトフォルダ名（例: cc-lp）
- **キャッチコピー**: プロジェクトの目的から生成
- **ターゲット受講者**: CLAUDE.md の共通ルール・想定ユーザーから
- **使用ツール**: package.json の依存 + CLAUDE.md のツール参照から
- **フェーズ構成**: SKILL.md のワークフロー Phase から
- **アクションマップ構成**: フェーズを日程に変換

`courses/{slug}/course_brief.md` に保存し、ユーザーに確認を求める:
```
course_brief.md の下書きを作成しました。
以下の内容を確認してください:
（内容を表示）

修正が必要な箇所はありますか？OKなら「全部作って」で生成を開始します。
```

### Step 3: meta.yaml を生成
確認済みの course_brief.md から `courses/{slug}/meta.yaml` を生成する。
スキーマは `src/content.config.ts` の `courses` コレクション定義に準拠。
`projectRepo` にプロジェクトのGitHubリポジトリURLを設定する。

### Step 4: レッスンを生成
`templates/lesson_template.md` を元に、各フェーズのレッスンMDファイルを生成する。
- 保存先: `courses/{slug}/lessons/{phase}_{title}.md`
- frontmatter の `course` は slug と一致させる
- frontmatter の `order` は連番（0, 1, 2...）
- **プロジェクトの CLAUDE.md・スキル・セットアップガイドの内容を反映する**
  - セットアップレッスン → SETUP-FOR-CC.md の手順をベースに
  - 実践レッスン → SKILL.md のワークフローをベースに
  - ツール解説 → CLAUDE.md のコマンド・トリガーをベースに

### Step 5: サムネイル・アクションマップを生成
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

各講座は cc-project-starter で作られたプロジェクトテンプレートと1対1で対応する。

**講座作成の起点は常に cc-project-starter**:
1. cc-project-starter でプロジェクトテンプレートを作る
2. このサイトで「講座を追加して」→ プロジェクトパスを指定
3. プロジェクトの CLAUDE.md・スキル・セットアップから講座コンテンツを自動生成

**連携ポイント**:
- `meta.yaml` の `projectRepo` → コース詳細ページにテンプレートリポジトリへのリンク表示
- プロジェクトの SKILL.md のフェーズ → 講座のレッスン構成に反映
- プロジェクトの SETUP-FOR-CC.md → セットアップレッスンの内容に反映
- プロジェクトの CLAUDE.md のトリガー → 実践レッスンの手順に反映
