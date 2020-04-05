<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form>
        <div class="input-field">
          <input
              id="name"
              type="text"
          >
          <label for="name">Название</label>
          <span class="helper-text invalid">Введите название</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid">Минимальная величина</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'category create'
}
</script>
