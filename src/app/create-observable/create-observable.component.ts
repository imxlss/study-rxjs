import { Component, OnInit } from "@angular/core";
import {
  Observable,
  of,
  from,
  fromEvent,
  empty,
  never,
  throwError,
  interval,
  timer
} from "rxjs";

@Component({
  selector: "create-observable",
  templateUrl: "./create-observable.component.html",
  styleUrls: ["./create-observable.component.css"]
})
export class CreateObservableComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.func_create();
    // this.func_of();
    // this.func_from();
    // this.func_fromEvent();
    // this.func_empty();
    // this.func_never();
    // this.func_throwError();
    // this.func_interval();
    // this.func_timer();
    this.func_unsubscribe();
  }

  private func_create(): void {
    const source = Observable.create(observer => {
      observer.next("one");
      observer.next("two");
      observer.complete();
    });

    source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  // of 同步传递几个值
  func_of() {
    /*const source = of('one', 'two');*/
    const source = of({ order: "three" }, [1, 2, 3], function hello() {
      return "Hello";
    });
    source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  func_from() {
    const arr = ["one", "two", 1, 2, "哈哈"];
    // const source = from(arr); // 可以传数组
    // const source = from('observable');  // 可以是字符串

    const source = from(
      // 可以是一个 promise 对象
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Hello RxJS!");
        }, 3000);
      })
    );

    source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  func_fromEvent() {
    const source = fromEvent(document.querySelector("#box"), "click");

    source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  func_empty() {
    const source = empty(); // empty 会给我们一个空的 observable, 立马complete

    source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  func_never() {
    const source = never(); // never() 什么都不送出，但是永远不会complete

    source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  func_throwError() {
    const source = throwError("oop!"); // 只抛出错误

    source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  func_interval() {
    const source = interval(1000); // 每隔一秒发送一个从零开始的整数 0、1、2、3 ...
    source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  func_timer() {
    // timer 可以传递一个或两个参数，第一个参数可以是 Number 和 Date，传 Date 的话会等到指定的时间在发送第一个值
    const source = timer(1000, 3000); // 等一秒发送 0 , 之后每三秒发送1, 2, 3, 4, 5
    source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  func_unsubscribe() {
    const source = timer(1000, 1000);
    /* 订阅 observable ，会得到一个 subscription 对象 ，可调用unsubscribe()*/
    const subscription = source.subscribe(
      val => {
        console.log(val);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("complete");
      }
    );

    setTimeout(() => {
      subscription.unsubscribe(); // 退订
    }, 5000);
  }
}
