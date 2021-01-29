<template>
  <div class="item-form">
    <h2 class="title">Submit a Item</h2>
    <!-- ファイル送信 -->
    <form class="form" @submit.prevent ="submit">
      <!-- 画像のプレビュー機能 @changeによりメソッドはしる -->
      <input class="form__item" type="file" @change="onFileChange">
      <!-- dataプロパティのpreviewが入った場合出力される -->
        <output class="form__output" v-if="preview">
        <img :src="preview" alt="">
        </output>
      <div class="form__button">
        <button type="submit" class="button button--inverse">submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      preview: null,
      item: null // ★ 追加
    }
  },
  methods:{
    // フォームでファイルが選択されたら実行される
     onFileChange (event) {
      // 何も選択されていなかったら処理中断
      if (event.target.files.length === 0) {
         this.reset() // 表示をリセットする
         return false
      }
      // ファイルが画像ではなかったら処理中断
      if (! event.target.files[0].type.match('image.*')) {
          this.reset() // 表示をリセットする
        return false
      }

      // FileReaderクラスのインスタンスを取得
      const reader = new FileReader()

      // ファイルを読み込み終わったタイミングで実行する処理
      reader.onload = e => {
        // previewに読み込み結果（データURL）を代入する
        // previewに値が入ると<output>につけたv-ifがtrueと判定される
        // また<output>内部の<img>のsrc属性はpreviewの値を参照しているので
        // 結果として画像が表示される
        this.preview = e.target.result
      }

      // ファイルを読み込む
      // 読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
      reader.readAsDataURL(event.target.files[0]),
      this.item = event.target.files[0] // ★ 追加
    },
    
     // 入力欄の値とプレビュー表示をクリアするメソッド
  reset () {
    this.preview = ''
    this.item = null // ★ 追加
    this.$el.querySelector('input[type="file"]').value = null
  },
  async submit () {
    const formData = new FormData()
    formData.append('item', this.item)
    const response = await axios.post('/api/items', formData)

    this.reset()
    this.$emit('input', false)
    this.$router.push(`/photos/${response.data.id}`)
  }
  }
}
</script>