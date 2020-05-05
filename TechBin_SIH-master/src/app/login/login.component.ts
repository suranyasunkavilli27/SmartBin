import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  data: any;
  public dbData: Observable<any>;
  values: Array<any> = []; //Array Initialization.
  noteListSubscription: Subscription;

  constructor(public as: AuthService, private route: Router) {}
  // To iterate observable we have to subscribe it and do it.
  ngOnInit() {
    this.data = this.as.get_string();
    this.dbData = this.as.display_details();
    // Iterating over the data which is in the observable.
    this.dbData.subscribe((val) =>
      val.forEach((element) => {
        this.values.push(element["value"]); // Adding data to the array.
        console.log(element["value"]);
      })
    );
  }

  lineChartData: ChartDataSets[] = [
    { data: this.values, label: "Crude oil prices" },
  ];

  lineChartLabels: Label[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
  ];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgba(255,255,0,0.28)",
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = "line";

  logOut() {
    this.as.loggedOut().then((v) => {
      console.log(v);
    });
    this.route.navigate(["/register"]);
  }
}
