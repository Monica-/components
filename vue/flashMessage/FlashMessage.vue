<template>
  <div class="msgbox-outer " :class="[outerClass,type]">
        <span class="msgbox-inner">
            {{ msg }}
        </span>
  </div>
</template>

<script>
import {bus} from '../../app';

export default {

  name: 'FlashMessage',
  props: ['message', 'msgType'],
  data() {
    return {
      show: false,
      msg: '',
      type: 'info', //error, warning
    };
  },
  watch: {
    message: function () {
      this.msg = this.message;
    },
    msgType: function () {
      this.type = this.msgType;
    },
    msg: function () {
      this.openFlash();
    },
  },
  computed: {
    outerClass() {
      return {
        show_bottomside: this.show,
        hidden_bottomside: !this.show,
      };
    },
  },
  methods: {
    openFlash() {
      if (this.msg) {
        this.show = true;
        setTimeout(() => {
          this.show = false;
          setTimeout(() => {
            this.msg = '';
          }, 1000);
        }, 4000);
      }
    },
  },
  created() {
    bus.$on('flash', (msg, type = 'info') => {
      this.type = type;
      this.msg = msg;
    });
  }
}
</script>
<style scoped>
.msgbox-outer {
  padding: 20px;
  position: fixed;
  right: 5px;
  left: 5px;
  transition: bottom 0.8s ease-in, opacity 0.8s ease-in;
  opacity: 1;
  font-size: 16px;
  text-align: center;
  color: whitesmoke;
}

.msgbox-inner {
  text-align: left;
  margin: auto;
}

.hidden_bottomside {
  bottom: -250px;
  opacity: 0;
}

.show_bottomside {
  bottom: 50px;
}

.info {
  border-left: 15px solid #2E8B57FF;
  background-color: #3CB371FF;
}

.error {
  border-left: 15px solid #ff3800;
  background-color: #fd8462;
}

.warning {
  border-left: 15px solid #d09100;
  background-color: #ffb200;
}

/*tailwind sm*/
@media (min-width: 640px) {
  .msgbox-outer {
    left: initial;
    right: 10px;
    width: 400px;
  }
}
</style>
