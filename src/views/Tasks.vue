<template>
  <v-container>
    <v-dialog
      v-model="report"
      width="500"
      >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Lets check on your progress
        </v-card-title>

        <v-divider></v-divider>

				<v-card-text>
					<p style="text-align: center">Time Spent (seconds)</p>
					<Piechart v-if="report" :height="100" :width="100" :data="taskTimes" :labels="taskLabels" />
				</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="report = false"
          >
            Got it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
		<v-dialog
			v-model="calander"
			width="1500"
			>
			<v-card>
				<v-card-title
					class="headline"
					primary-title
				>
					Lets look at your schedule
				</v-card-title>
        <v-divider></v-divider>

				<v-card-text>
					<full-calendar :config="config" :events="events"></full-calendar>
				</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="calander = false"
          >
            Got it!
          </v-btn>
        </v-card-actions>
			</v-card>
		</v-dialog>
    <v-dialog
      v-model="dialog"
      width="500"
    	>
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          You need to input something! Doing nothing isn't productive...
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Got it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        Add a task
      </v-card-title>
      <v-card-text>
        <v-textarea
          outline
          name="input-7-4"
          label="What am I going to accomplish today?"
          v-model="newTask"
          value="Finish that essay that I procrasinated on..."
        ></v-textarea>
        <v-btn color="success" @click="addTask()">Add</v-btn>
        <v-btn color="success" v-if="doneNum > 0" @click="showReport()">Time Distribution</v-btn>
        <v-btn color="success" v-if="taskArc.length > 0" @click="openCalander()">Calender</v-btn>
      </v-card-text>
    </v-card>
    <v-card style="margin-top:10px">
      <v-card-title>
        Tasks to do!
      </v-card-title>
      <div v-if="tasks.length > 0">
	      <v-divider></v-divider>
	      <v-card-text v-if="tasks.length > 0">
		<div 
		v-for="task in tasks"
		:key="task.title"
		>
		  <v-list-tile>
		    <v-list-tile-action>
		      <v-btn @click="finishTask(task)" icon ripple>
		        <v-icon color="grey lighten-1">check_circle</v-icon>
		      </v-btn>
		    </v-list-tile-action>

		    <v-list-tile-content @click="finishTask(task)">
		      <v-list-tile-title>{{task.title}}</v-list-tile-title>
		      <v-list-tile-sub-title>{{computeDate(task.createdAt, "c")}}</v-list-tile-sub-title>
		    </v-list-tile-content>
		  </v-list-tile>
		</div>

	      </v-card-text>
        </div>
    </v-card>
    <v-card style="margin-top:10px">
      <v-card-title>
        Tasks you finished!
      </v-card-title>
      <div v-if="doneTasks.length > 0">
	      <v-divider></v-divider>
	      <v-card-text >
		<div 
		v-for="task in doneTasks"
		:key="task.title"
		>
		  <v-list-tile>
		    <v-list-tile-action>
		      <v-btn @click="deleteTask(task)" icon ripple>
		        <v-icon color="grey lighten-1">not_interested</v-icon>
		      </v-btn>
		    </v-list-tile-action>
		    <v-list-tile-content>
		      <v-list-tile-title>{{task.title}}</v-list-tile-title>
		      <v-list-tile-sub-title>{{computeDate(task.finishedAt, "f")}}</v-list-tile-sub-title>
		    </v-list-tile-content>
		  </v-list-tile>
		</div>
	      </v-card-text>
       </div>
    </v-card>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import Piechart from '../components/Pie.vue';
import timediff from 'timediff';
import { FullCalendar } from 'vue-full-calendar';

export default {
  data () {
    return {
			config: {
  			defaultView: 'month'
			},
			calander: false,
      report: false,
      dialog: false,
      newTask: "",
      tasks: [],
			doneNum: 0,
      doneTasks: [],
      taskArc: [],
      reportTimes: [],
			taskLabels: [],
			taskTimes: [],
      events: []
    }
  },
  components: {
    Piechart,
		FullCalendar
  },
  methods: {
		openCalander(){
			this.taskArc.map(k => {
			  this.events = [];
				if(k.finished == false){
	
					this.events.push({
						title: k.title,
						start: k.createdAt,
						color: 'red'
					})
				} else {
					this.events.push({
						title: k.title,
						start: k.createdAt,
						end: k.finishedAt,
						color: 'green'
					})
				}
				this.calander = true;
			})
		},
    dateDifference(d1, d2) {
			return timediff(d1, d2, 'S');
    },
    showReport() {
      this.reportTimes = [];
		    this.taskArc.forEach(item => {
		    if(item.finishedAt && item.finished == true) {
					this.reportTimes.push({
						title: item.title,
						timeSpent: this.dateDifference(item.createdAt, item.finishedAt).seconds,
					})
					console.log(this.reportTimes);
					this.taskLabels = this.reportTimes.map(k => k.title);
					this.taskTimes = this.reportTimes.map(k => k.timeSpent);
				}
      })
			console.log("--t--")
			console.log(this.taskTimes);
			console.log("--t--")
      this.report = true;
    },
    addTask() {
     if(this.newTask != ""){ 
      var today = new Date();
      this.tasks.push({
        title: this.newTask, 
        createdAt: today,
      })
      this.taskArc.push({
        title: this.newTask, 
        createdAt: today,
        finishedAt: null,
        finished: false,
      })
      this.newTask = "";
     } else {
			this.dialog = true;
     }
    },
    finishTask(task) {
      var today = new Date();
      console.log(task)
      var indexNum = this.tasks.findIndex(k => k.title === task.title)
      var arcIndex = this.taskArc.findIndex(k => k.title === task.title)
      this.taskArc[arcIndex].finished = true;
      this.taskArc[arcIndex].finishedAt = today;
      this.tasks.splice(indexNum, 1)
			console.log('[][][][]')
      console.log(this.tasks)
			console.log('[][][][]')      
			this.doneTasks.push({
        title: task.title,
        finishedAt: today,
      })
			this.doneNum++;
      console.log(this.taskArc[arcIndex]);
    },
    deleteTask(task) {
      var indexNum = this.doneTasks.findIndex(k => k.title == task.title)
      this.doneTasks.splice(indexNum, indexNum+1)
    },
    computeDate(d, context) {
      var now = new Date(d);
      var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"]
      var day = now.getDate();
			var tod = "";
			if(now.getHours() > 12) {
				var hours = (now.getHours() - 12)
				tod = "pm";
			} else {
				var hours = (now.getHours())
				tod = "am"
			}
      if(now.getMinutes() < 10) {
				var minute = "0" + now.getMinutes();
      } else {
				var minute = now.getMinutes();
      }
      if(context == "c") {
        return "Created on " + months[now.getMonth()] + " " + day + "th at " + hours + ":" + minute + tod;
      } else { 
        return "Finished on " + months[now.getMonth()] + " " + day + "th at " + hours + ":" + minute + tod;
      }
    }
  }
}
</script>

<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style>

