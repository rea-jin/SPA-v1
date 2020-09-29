/**
 * クッキーの値を取得する
 * @param {String} searchKey 検索するキー
 * @returns {String} キーに対応する値
 */
export function getCookieValue (searchKey) {
    if (typeof searchKey === 'undefined') {
      return ''
    }
  
    let val = ''
    /**
     * document.cookieの形式：name=12345;token=67890;key=abcde
     * これを、；で分けて、配列形式にする
    */
   
    document.cookie.split(';').forEach(cookie => {
      const [key, value] = cookie.split('=')
      if (key === searchKey) {
        return val = value
      }
    })
  
    return val
  }
