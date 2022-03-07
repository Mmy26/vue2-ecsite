<template>
  <div>
    <stripe-element-card
      class="card-form"
      ref="elementRef"
      :pk="publishableKey"
      @token="tokenCreated"
    />
    <button class="btn" v-on:click="submit" style="margin: 10px">
      クレジットカードが利用できるか確認する。
    </button>
    <div class="preload-field" v-show="loadingFrag">
      <div class="preloader-wrapper small active">
        <div class="spinner-layer spinner-green-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
    <div>{{ statusMessage }}</div>
  </div>
</template>

<script>
import { StripeElementCard } from "@vue-stripe/vue-stripe";
export default {
  components: {
    StripeElementCard,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    this.publishableKey =
      "pk_test_51KXEv3JCsPiBje8q6lten04DtC90GI2PxS3LDGkS8FukijDwlllW2k3I7ssn4pf8h19mhpuTrABFGZBzbSVdWCSb00HLN2Vt47";
    return {
      token: null,
      statusMessage: "",
      loadingFrag: false,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    submit() {
      this.loadingFrag = true;
      this.statusMessage = "確認中.....";
      // this will trigger the process
      this.$refs.elementRef.submit();
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    tokenCreated(token) {
      console.log(token);
      this.loadingFrag = false;
      this.statusMessage = "クレジットカードの有効性を確認しました!";
      // handle the token
      // send it to your server
    },
  },
};
</script>
<style scoped>
.card-form {
  width: 600px;
}
</style>
