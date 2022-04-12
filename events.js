/**
 * JS -> WP
 * 【イベント情報】
 */

/** *********************************************************************************
 * メディアアップロード
 * @param {String} file_base64 - base64形式に変換された画像ファイル文字列
 ********************************************************************************* */
async function upload_media(file_base64) {
  const fUploadFd = new FormData();
  fUploadFd.append('action', 'uploadMedia');
  fUploadFd.append('file', file_base64);

  return await axios_admin_ajax(fUploadFd);
  // { id: xxx, url: https://...jp/~/~.png }
}

/** *********************************************************************************
 * 投稿(イベント情報)
 ********************************************************************************* */
async function post_wp() {
  const data = {
    action      : 'upsertPost', // 実行されるWP PHP関数
    post_author : xxx,          // 事業者ユーザーID(WP_UID)
    post_id     : xxx,          // 投稿ID(あれば更新、なければ新規)
    post_type   : 'events',
    post_title  : '',           // タイトル
    post_date   : '',           // 日時(yyyy-MM-dd HH:mm:ss)
    post_status : '',           // 'draft':下書き | 'publish':公開 | 'private':公開終了 | 'trash':削除
    taxonomies  : {
      cities    : [],   // 市区町村カテゴリータームID（配列）
      cat_events: [],   // イベントカテゴリータームID（配列）
    },
    acf         : {
      ギャラリー  : [],     // メディアID
      開催日_自_  : '',     // 日付(yyyy-MM-dd)
      開催日_至_  : '',     // 日付(yyyy-MM-dd)
      開催時間_自_: '',     // 時間(HH:mm)
      開催時間_至_: '',     // 時間(HH:mm)
      開催日時詳細: '',     // 文字列(複数行)
      開催場所    : '',     // 文字列(一行)
      ホームページ: '',     // 文字列(一行)
      交通アクセス: '',     // 文字列(複数行)
      定員        : '',     // 数値
      お問い合わせ: '',     // 文字列(複数行)
      イベント情報: '',     // リッチテキスト(HTML可)
      料金        : '',     // 文字列(複数行)
      イベント中止: false,  // Boolean
      駐車場有無  : false,  // Boolean
    },
  };

  const post = await axios_admin_ajax(data).then(resp => {
    return resp;
  }).catch(err => {
    console.error(err)
  });

  console.log(post)
}


/** ***************************************************************************
 * admin ajax
 *************************************************************************** */
async function axios_admin_ajax(param) {
  const admin_ajax_url = `https://minna.digital-town.jp/wp-admin/admin-ajax.php`;
  return await axios({
    url: admin_ajax_url,
    data: param,
    method: 'POST',
    headers: { 'Content-Type': (param) ? 'application/json' : 'multipart/form-data' },
    responseType: 'json',
  }).then(res => {
    if (res.status === 200) {
      return res.data;
    } else {
      throw res;
    }
  }).catch(err => {
    console.error(err);
  })
}