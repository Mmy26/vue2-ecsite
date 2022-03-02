<template>
  <div>
    <stripe-element-card
      ref="elementRef"
      :pk="publishableKey"
      @token="tokenCreated"
    />
    <button @click="submit">Generate token</button>
  </div>
</template>

<script>
import { StripeElementCard } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeElementCard,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    this.publishableKey = "pk_test_51KXEv3JCsPiBje8q6lten04DtC90GI2PxS3LDGkS8FukijDwlllW2k3I7ssn4pf8h19mhpuTrABFGZBzbSVdWCSb00HLN2Vt47";
    return {
      token: null,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    submit () {
      // this will trigger the process
      this.$refs.elementRef.submit();
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    tokenCreated (token) {
      console.log(token);
      console.log("有用性を確認しました!")
      // handle the token
      // send it to your server
    },
  }
};
</script>
