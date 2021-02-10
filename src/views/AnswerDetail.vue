<template>
  <div class="answer-detail">
    <home-header/>
    <question-header/>
    <answers-content/>
  </div>
</template>
<script>
import HomeHeader from 'components/headers/HomeHeader'
import QuestionHeader from 'components/answerChild/QuestionHeader'
import AnswersContent from 'components/answerChild/AnswersContent.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    HomeHeader,
    QuestionHeader,
    AnswersContent
  },
  methods: {

  }
}
</script>