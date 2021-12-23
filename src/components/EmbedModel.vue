<template>
  <div class="bootstrap-modal-no-jquery">
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Embed</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" >
              <div>
                  {{loadingText}}
              </div>
          </div>
          <div class="modal-footer">
            <a :href="loadingText" type="button" class="btn btn-primary" @click="copyifream" ref="mylink">copy</a>
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data(){
     return{
      loadingText: '<iframe src="demo_iframe.htm" height="200" width="300" title="Iframe Example"></iframe>',
     }
     },
    methods: {
      closeModal() {
        this.$emit('close-modal-event');
        this.$parent.hideModal();
      },
      saveChanges() {
        this.closeModal();
      },
      copyifream()
      {
                var Url = this.$refs.mylink;
                Url.innerHTML = window.location.href;
                console.log(Url.innerHTML)
                // Url.select();
                // document.execCommand("copy");
      }
    }
  }
</script>

<style scoped>
  /* Override default value of 'none' */
  .modal {
    display: block;
  }
</style>