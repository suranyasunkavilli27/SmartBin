import { Injectable, NgZone } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  res: any;
  userData: any;
  public colist: any[];
  sampleData: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private afAuth: AngularFireAuth,
    private af: AngularFirestore,
    public as: AuthService,
    public zone: NgZone
  ) {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user.uid;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     console.log("Token set");
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // });
  }

  // Created the reference for realtime Db
  public df = firebase.database().ref().child("data");

  // Using an 'on' Event so it updates the data synchronously.

  display_details() {
    console.log("Display Fucntion Called");
    console.log(this.db.list("data").valueChanges());
    return this.db.list("data").valueChanges(); // returning an observable from db whenever changes happens in db.
    // let dataArr = [];
    // this.df.on("value", (snap) => {
    //   console.log(snap.val());
    //   dataArr.push(snap.val());
    // });
  }

  arrayData(list) {
    console.log("Function Called");
    for (var i = 0; i < list.length; i++) {
      console.log("Array value" + list[i]);
    }
  }

  doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    this.afAuth.auth.signInWithPopup(provider).then((res) => {
      console.log(res);
      let r = res.user.uid;
      localStorage.setItem("user", r);
      var docref = this.af.collection("UID").doc(r);
      docref.get().subscribe((doc) => {
        if (doc.exists) {
          this.af
            .collection("UID")
            .doc(r)
            .update({
              name: res.user.email,
              arr: firebase.firestore.FieldValue.arrayUnion(
                this.getRandomSpan()
              ),
              val: this.get_string(),
            });
          console.log("Already logged In");
        } else {
          this.af
            .collection("UID")
            .doc(r)
            .set({
              name: res.user.email,
              arr: firebase.firestore.FieldValue.arrayUnion(
                this.getRandomSpan()
              ),
              val: this.get_string(),
            });
          console.log("First time Logged In");
        }
      });
    });
  }

  getUsers() {
    return this.af.collection("users").snapshotChanges();
  }

  getRandomSpan() {
    return Math.floor(Math.random() * 6 + 1);
  }

  anonymousLogin() {
    this.zone.run(() => {
      this.afAuth.auth.signInAnonymously().then((user) => {
        if (localStorage.getItem("user") == null) {
          localStorage.setItem("user", user.user.uid);
          this.af
            .collection("UID")
            .doc(user.user.uid)
            .set({
              uid: user.user.uid,
              arr: firebase.firestore.FieldValue.arrayUnion(
                this.getRandomSpan()
              ),
            });
        } else {
          this.af
            .collection("UID")
            .doc(user.user.uid)
            .set(
              {
                uid: user.user.uid,
                arr: firebase.firestore.FieldValue.arrayUnion(
                  this.getRandomSpan()
                ),
              },
              { merge: true }
            );
        }
      });
    });
  }

  linkaccount() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.currentUser
      .linkWithPopup(provider)
      .then(function (result) {
        // Accounts successfully linked.
        var credential = result.credential;
        var user = result.user;
        console.log("linked successfully");
        console.log(credential + " " + user);
      })
      .catch(function (error) {
        console.log("account already exists ");
      });
  }

  loggedOut() {
    return new Promise<any>((resolve, reject) => {
      return firebase
        .auth()
        .signOut()
        .then(function () {
          localStorage.removeItem("user");
          this.router.navigate(["/register"]);
          console.log("Successfully Logged Out");
        })
        .catch(function (error) {
          console.log("Error occured");
        });
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem("user");
  }

  string_set(string1) {
    this.res = string1;
  }
  get_string(): string {
    return this.res;
  }
}
