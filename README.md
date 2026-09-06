# sgt9863.github.io

`sgt9863.com` のトップページ（GitHub Pages のユーザーサイト）。

## ⚠️ プッシュの順番（先に読む）

**DNS を設定する前に `CNAME` を GitHub にプッシュしてはいけない。**

`CNAME` が push されて Pages が有効になると、GitHub は `sgt9863.github.io/...` から
`sgt9863.com/...` への転送を始める。DNS が未設定だと転送先が存在しないので、
**このサイトだけでなく stats / paper-explainer / lc-iso-dev の全てが見られなくなる。**

正しい順番:

1. Cloudflare に DNS レコードを入れる（A 4本 ＋ www の CNAME、**プロキシはオフ／グレーの雲**）
2. `dig +short A sgt9863.com` で 185.199.x.x が返るのを確認
3. このリポジトリを push して Pages を有効化（`CNAME` はこの時点で初めて効く）
4. GitHub が証明書を発行するのを待ち、`https://sgt9863.com` を確認

DNS がまだなら、`CNAME` を一時的に外して push すること（`git rm --cached CNAME`）。

## このリポジトリの役割

**独自ドメインの設定はこのリポジトリに置く。** GitHub Pages はユーザーサイトに独自ドメインを設定すると、
同じアカウントの全プロジェクトサイトを自動的にそのドメインのサブパスへ移す。

| URL | 実体のリポジトリ |
|---|---|
| `sgt9863.com/` | このリポジトリ |
| `sgt9863.com/stats/` | [stats](https://github.com/sgt9863/stats) — 統計学習ハブ |
| `sgt9863.com/paper-explainer/` | [paper-explainer](https://github.com/sgt9863/paper-explainer) — KAMPO PAPER LAB |
| `sgt9863.com/lc-iso-dev/` | [lc-iso-dev](https://github.com/sgt9863/lc-iso-dev) — グラジエント分離モデル 理解ノート |

各プロジェクト側に `CNAME` ファイルは**置かない**（置くとそのリポジトリだけドメイン直下を占有してしまう）。

## 現状

`index.html` は**たたき台**。デザインは stats サイトの `style.css` からトークンを借りている。

### 配色で踏んではいけない罠

`--ink`（墨）は**ダークモードで明色に反転する文字色用トークン**。白文字を載せる面の背景に使うと
ダークで判読不能になる（stats サイトで実際に起き、コントラスト比 1.21 だった）。
このページでは反転しない `--ink-solid` を用意してある。面を足すときはそちらを使うこと。

## ローカルで開く

```bash
python3 -m http.server 5184 --directory sgt9863.github.io
```

（ワークスペースの `.claude/launch.json` に `home` として登録済み）
