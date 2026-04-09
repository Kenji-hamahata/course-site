## Skillsと使い方

### Skill: generate_action_map
- トリガー：「アクションマップを作って」
- 入力：inputs/course_brief.md
- 処理：
  1. course_brief.mdの「アクションマップ構成」セクションを読み込む
  2. templates/action_map_template.htmlの{{}}プレースホルダーを置換する
  3. outputs/action_map.htmlに保存する
  4. 「action_map.htmlを生成しました。ブラウザで開いてスクリーンショットしてください」と報告する

### Skill: generate_thumbnails
- トリガー：「サムネイルを作って」
- 入力：inputs/course_brief.md
- 処理：
  1. course_brief.mdの「コース一覧」セクションを読み込む
  2. 各コースについてtemplates/thumbnail_template.htmlの{{}}プレースホルダーを置換する
  3. outputs/thumbnails/course_01.html〜に保存する（コース数分）
  4. 生成したファイル一覧を報告する

### Skill: generate_lessons
- トリガー：「レッスンを書いて」 または 「コース名：〇〇のレッスンを書いて」
- 入力：inputs/course_brief.md（対象コースのフェーズ構成）
- 処理：
  1. 対象コースのフェーズ構成（0-0, 0-1, 1-1...）を読み込む
  2. 各レッスンについてtemplates/lesson_template.mdを使って本文を生成する
  3. outputs/lessons/コース名_0-0.md〜に保存する
  4. 生成したレッスン数と一覧を報告する

### Skill: generate_all
- トリガー：「全部作って」
- 処理：generate_action_map → generate_thumbnails → generate_lessons を順に実行

## 品質ルール（全Skill共通）
- セルフチェックが2種類（完了・品質）揃っているか確認する
- 「なぜこれをするのか？」が全レッスンに含まれているか確認する
- 「まとめと次のステップ」が最終レッスンを除く全レッスンにあるか確認する
- Before/After表はできるだけ具体的に（抽象的な表現を避ける）
```

---

## 使い方フロー（まとめ）
```
1. inputs/course_brief.md に講座情報を記入
         ↓
2. Claude Codeに「全部作って」と送る
         ↓
3. outputs/ に以下が生成される：
   - action_map.html（ブラウザで開いてスクショ → バナー画像）
   - thumbnails/course_01.html〜（ブラウザで開いてスクショ → サムネ）
   - lessons/〇〇_0-0.md〜（テキスト原稿 → LMSに貼り付け）