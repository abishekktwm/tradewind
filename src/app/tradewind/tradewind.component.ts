import { Component, OnInit, Pipe } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'tradewind',
  templateUrl: './tradewind.component.html',
  styleUrls: ['./tradewind.component.css']
})

export class TradewindComponent implements OnInit {

  initialState = [];
  timeSeries = [];
  limitExceeded = new Set();
  wrngExceeded = new Set();
  cfgdnoExceeded = new Set();
  poolLimits = new Map();

  // the configured number is set to 40000000
  configuredNo = 40000000;

  initStateUrl = 'https://api.jsonbin.io/b/5b13004bc2e3344ccd96cb4a';
  timeSeriesUrl = 'https://api.jsonbin.io/b/5b130242c2e3344ccd96cb4d';

  constructor(private http: Http) { }

  ngOnInit() {

    this.getInitialState();
    this.getTimeSeries();

  }

  getTimeSeries() {
    this.http.get(this.timeSeriesUrl)
      .subscribe(res => {
        this.setTimeSeries(res.json());
      })
  }

  setTimeSeries(res) {
    // save timeseries api response
    this.timeSeries = res;

    for (let i = 0; i < this.timeSeries.length; i++) {
      if (parseInt(this.timeSeries[i]['Util1']) / parseInt(this.poolLimits.get(this.timeSeries[i]['CreditPool'])) * 100 > 75) {
        this.setDelay(i, 'wrn', this.timeSeries[i]['CreditPool']);
      }

      if (parseInt(this.timeSeries[i]['Util1']) > this.configuredNo) {
        this.setDelay(i, 'cfg', this.timeSeries[i]['CreditPool']);
      }

      if (parseInt(this.timeSeries[i]['Util1']) > parseInt(this.poolLimits.get(this.timeSeries[i]['CreditPool']))) {
        this.setDelay(i, 'lmt', this.timeSeries[i]['CreditPool']);
      }
    }
  }

  setDelay(i, group, pool) {
    // mimicking websocket by introducing one second delay
    setTimeout(() => {
      switch (group) {
        // based on new transactions, add credit pools to their respective hash sets
        case 'wrn':
          this.wrngExceeded.add(pool);
        case 'cfg':
          this.cfgdnoExceeded.add(pool);
        case 'lmt':
          this.limitExceeded.add(pool);
      }
    }, 1000 * i);
  }

  getInitialState() {
    this.http.get(this.initStateUrl)
      .subscribe(res => {
        this.setInitialState(res.json());
      })
  }


  setInitialState(res) {
    // save initial state api response
    this.initialState = res;

    for (let i = 0; i < this.initialState.length; i++) {

      if (parseInt(this.initialState[i]['Util1']) > parseInt(this.initialState[i]['Limit1'])) {
        // creating a hash set of all the credit pools whose utilization exceeded the limit
        this.limitExceeded.add(this.initialState[i]['CreditPool']);
      }
      else {
        if (this.limitExceeded.has(this.initialState[i]['CreditPool']))
          // remove the last entry and only keep the latest transaction of the credit pool
          this.limitExceeded.delete(this.initialState[i]['CreditPool']);
      }

      let utilpct = parseInt(this.initialState[i]['Util1']) / parseInt(this.initialState[i]['Limit1']) * 100;

      if (utilpct >= parseInt(this.initialState[i]['WarnPct'])) {
        // creating a hash set of all the credit pools whose utilization exceeded the warning percentage
        this.wrngExceeded.add(this.initialState[i]['CreditPool']);
      }
      else {
        if (this.wrngExceeded.has(this.initialState[i]['CreditPool']))
          // remove the last entry and only keep the latest transaction of the credit pool
          this.wrngExceeded.delete(this.initialState[i]['CreditPool']);
      }

      if (parseInt(this.initialState[i]['Util1']) > this.configuredNo) {
        // creating a hash set of all the credit pools whose utilization exceeded the configured number
        this.cfgdnoExceeded.add(this.initialState[i]['CreditPool']);
      }
      else {
        if (this.cfgdnoExceeded.has(this.initialState[i]['CreditPool']))
          // remove the last entry and only keep the latest transaction of the credit pool
          this.cfgdnoExceeded.delete(this.initialState[i]['CreditPool']);
      }

      if (!this.poolLimits.has(this.initialState[i]['CreditPool'])) {
        // creating a hash map of all the credit pools and their limits
        this.poolLimits.set(this.initialState[i]['CreditPool'], this.initialState[i]['Limit1']);
      }
    }
  }
}