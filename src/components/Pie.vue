
<script>
import { Pie } from 'vue-chartjs'
import randomHex from 'random-hex-color'

export default {
  extends: Pie,
  props: ['data', 'labels'],
  mounted () {
    var randomColors = [];
		this.labels.forEach(k => {
			randomColors.push(randomHex());
		})
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: randomColors,
          data: this.data,
        }
      ]
    })
  }
}
</script>
