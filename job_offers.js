/**
 * JS -> WP
 * 【求人情報】
 */

/** *********************************************************************************
 * 投稿(求人情報)
 ********************************************************************************* */
async function post_wp() {
  const data = {
    action      : 'upsertPost', // 実行されるWP PHP関数
    post_author : xxx,          // 事業者ユーザーID(WP_UID)
    post_id     : xxx,          // 投稿ID(あれば更新、なければ新規)
    post_type   : 'job_offers',
    post_title  : '',           // タイトル
    post_date   : '',           // 日時(yyyy-MM-dd HH:mm:ss)
    post_status : '',           // 'draft':下書き | 'publish':公開 | 'private':公開終了 | 'trash':削除
    post_slug   : `jo_${求人番号}`,
    taxonomies  : {
      cities: [],                           // 市区町村カテゴリータームID（配列） - 勤務エリア？
      cat_job_offer_genre             : [], // 業種ジャンルタームID（配列）
      cat_job_offer_genre_stay        : [], // 【宿泊】業種ジャンルタームID（配列）
      cat_job_offer_genre_wedding     : [], // 【ウェディング】業種ジャンルタームID（配列）
      cat_job_offer_genre_agriculture : [], // 【農業】業種ジャンル タームID（配列）
    },
    acf: {
      レコード番号      : '', // kintone求人レコード番号
      事業所レコード番号: '', // kintone事業所レコード番号
      求人番号: '',   // 文字列
      掲載期限: '',   // 日付(yyyy-MM-dd)

      事業所名  : '', // 文字列
      郵便番号  : '', // 数値(ハイフン無し)
      都道府県名: '', // 文字列
      住所      : '', // 文字列
      電話番号  : '', // 文字列
      FAX       : '', // 文字列

      // 雇用情報
      勤務エリア: '', // 文字列
      就業場所  : '', // 文字列
      契約形態  : '', // 文字列
      雇用開始日: '', // 日付(yyyy-MM-dd)
      雇用終了日: '', // 日付(yyyy-MM-dd)
      募集人数  : '', // 数値

      // 待遇
      給与形態  : '', // 文字列
      給与_自_  : '', // 数値
      給与_至_  : '', // 数値
      給与_補足 : '', // 文字列
      福利厚生  : '', // 文字列

      // 勤務条件
      就労時間_自_    : '', // 時間(HH:mm)
      就労時間_至_    : '', // 時間(HH:mm)
      勤務時間_補足   : '', // 文字列
      時間外労働の有無: '', // 真偽値（Boolean）
      時間外労働に関する補足説明: '',   // 文字列
      勤務曜日: [],         // 配列 > 文字列
      勤務曜日に関する補足説明: '',     // 文字列
      休日に関する補足説明: '',         // 文字列

      // 仕事に関する記載事項
      仕事内容: '', // リッチテキスト(HTML可)
      必須条件: '', // 文字列
      優遇条件: '', // 文字列

      // 自社からの記載事項
      採用担当者からのコメント: '',     // 文字列
      採用担当者  : '', // 文字列
      応募情報    : '', // 文字列
      問い合わせ先: '', // 文字列
    },
  }

  const post = await axios_wp_admin_ajax(data).then(resp => {
    return resp;
  }).catch(err => {
    console.error(err)
  });

  console.log(post);

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