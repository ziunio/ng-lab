(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    "0EUg": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return s;
      });
      var r = n("bHdf");
      function s() {
        return Object(r.a)(1);
      }
    },
    "2QA8": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      });
      const r = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
    },
    "2fFW": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return s;
      });
      let r = !1;
      const s = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            r &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          r = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return r;
        },
      };
    },
    "5+tZ": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return c;
      });
      var r = n("ZUHj"),
        s = n("l7GE"),
        i = n("51Dv"),
        o = n("lJxs"),
        a = n("Cfvw");
      function c(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                c(
                  (n, r) =>
                    Object(a.a)(t(n, r)).pipe(
                      Object(o.a)((t, s) => e(n, t, r, s))
                    ),
                  n
                )
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new u(t, n)));
      }
      class u {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new l(t, this.project, this.concurrent));
        }
      }
      class l extends s.a {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const s = new i.a(this, e, n),
            o = this.destination;
          o.add(s);
          const a = Object(r.a)(this, t, void 0, void 0, s);
          a !== s && o.add(a);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyComplete(t) {
          const e = this.buffer;
          this.remove(t),
            this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
    },
    "51Dv": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return s;
      });
      var r = n("7o/Q");
      class s extends r.a {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
    },
    "7o/Q": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return u;
      });
      var r = n("n6bG"),
        s = n("gRHU"),
        i = n("quSY"),
        o = n("2QA8"),
        a = n("2fFW"),
        c = n("NJ4a");
      class u extends i.a {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = s.a;
              break;
            case 1:
              if (!t) {
                this.destination = s.a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof u
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new l(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new l(this, t, e, n));
          }
        }
        [o.a]() {
          return this;
        }
        static create(t, e, n) {
          const r = new u(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class l extends u {
        constructor(t, e, n, i) {
          let o;
          super(), (this._parentSubscriber = t);
          let a = this;
          Object(r.a)(e)
            ? (o = e)
            : e &&
              ((o = e.next),
              (n = e.error),
              (i = e.complete),
              e !== s.a &&
                ((a = Object.create(e)),
                Object(r.a)(a.unsubscribe) && this.add(a.unsubscribe.bind(a)),
                (a.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = a),
            (this._next = o),
            (this._error = n),
            (this._complete = i);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            a.a.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = a.a;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n
                ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0))
                : Object(c.a)(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              Object(c.a)(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              a.a.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), a.a.useDeprecatedSynchronousErrorHandling))
              throw n;
            Object(c.a)(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!a.a.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (r) {
            return a.a.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (Object(c.a)(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
    },
    "9ppp": function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      });
      const r = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
    },
    Cfvw: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return h;
      });
      var r = n("HDdC"),
        s = n("SeVD"),
        i = n("quSY"),
        o = n("kJWO"),
        a = n("jZKg"),
        c = n("Lhse"),
        u = n("c2HN"),
        l = n("I55L");
      function h(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[o.a];
                  })(t)
                )
                  return (function (t, e) {
                    return new r.a((n) => {
                      const r = new i.a();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[o.a]();
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (Object(u.a)(t))
                  return (function (t, e) {
                    return new r.a((n) => {
                      const r = new i.a();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                r.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (Object(l.a)(t)) return Object(a.a)(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[c.a];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new r.a((n) => {
                      const r = new i.a();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[c.a]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = s.next();
                                    (t = n.value), (e = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof r.a
          ? t
          : new r.a(Object(s.a)(t));
      }
    },
    DH7j: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      });
      const r = (() =>
        Array.isArray || ((t) => t && "number" == typeof t.length))();
    },
    EY2u: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return s;
      }),
        n.d(e, "b", function () {
          return i;
        });
      var r = n("HDdC");
      const s = new r.a((t) => t.complete());
      function i(t) {
        return t
          ? (function (t) {
              return new r.a((e) => t.schedule(() => e.complete()));
            })(t)
          : s;
      }
    },
    GyhO: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      var r = n("LRne"),
        s = n("0EUg");
      function i(...t) {
        return Object(s.a)()(Object(r.a)(...t));
      }
    },
    HDdC: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return u;
      });
      var r = n("7o/Q"),
        s = n("2QA8"),
        i = n("gRHU"),
        o = n("kJWO"),
        a = n("mCNh"),
        c = n("2fFW");
      let u = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: o } = this,
              a = (function (t, e, n) {
                if (t) {
                  if (t instanceof r.a) return t;
                  if (t[s.a]) return t[s.a]();
                }
                return t || e || n ? new r.a(t, e, n) : new r.a(i.a);
              })(t, e, n);
            if (
              (a.add(
                o
                  ? o.call(a, this.source)
                  : this.source ||
                    (c.a.useDeprecatedSynchronousErrorHandling &&
                      !a.syncErrorThrowable)
                  ? this._subscribe(a)
                  : this._trySubscribe(a)
              ),
              c.a.useDeprecatedSynchronousErrorHandling &&
                a.syncErrorThrowable &&
                ((a.syncErrorThrowable = !1), a.syncErrorThrown))
            )
              throw a.syncErrorValue;
            return a;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              c.a.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: s } = t;
                    if (e || s) return !1;
                    t = n && n instanceof r.a ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = l(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [o.a]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length ? this : Object(a.b)(t)(this);
          }
          toPromise(t) {
            return new (t = l(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function l(t) {
        if ((t || (t = c.a.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
    },
    I55L: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      });
      const r = (t) =>
        t && "number" == typeof t.length && "function" != typeof t;
    },
    JIr8: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return o;
      });
      var r = n("l7GE"),
        s = n("51Dv"),
        i = n("ZUHj");
      function o(t) {
        return function (e) {
          const n = new a(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      class a {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new c(t, this.selector, this.caught));
        }
      }
      class c extends r.a {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new s.a(this, void 0, void 0);
            this.add(r);
            const o = Object(i.a)(this, n, void 0, void 0, r);
            o !== r && this.add(o);
          }
        }
      }
    },
    JX91: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      var r = n("GyhO"),
        s = n("z+Ro");
      function i(...t) {
        const e = t[t.length - 1];
        return Object(s.a)(e)
          ? (t.pop(), (n) => Object(r.a)(t, n, e))
          : (e) => Object(r.a)(t, e);
      }
    },
    LRne: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return o;
      });
      var r = n("z+Ro"),
        s = n("yCtX"),
        i = n("jZKg");
      function o(...t) {
        let e = t[t.length - 1];
        return Object(r.a)(e) ? (t.pop(), Object(i.a)(t, e)) : Object(s.a)(t);
      }
    },
    Lhse: function (t, e, n) {
      "use strict";
      function r() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      n.d(e, "a", function () {
        return s;
      });
      const s = r();
    },
    NJ4a: function (t, e, n) {
      "use strict";
      function r(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      n.d(e, "a", function () {
        return r;
      });
    },
    SeVD: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return l;
      });
      var r = n("ngJS"),
        s = n("NJ4a"),
        i = n("Lhse"),
        o = n("kJWO"),
        a = n("I55L"),
        c = n("c2HN"),
        u = n("XoHu");
      const l = (t) => {
        if (t && "function" == typeof t[o.a])
          return (
            (l = t),
            (t) => {
              const e = l[o.a]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (Object(a.a)(t)) return Object(r.a)(t);
        if (Object(c.a)(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, s.a),
              t
            )
          );
        if (t && "function" == typeof t[i.a])
          return (
            (e = t),
            (t) => {
              const n = e[i.a]();
              for (;;) {
                const e = n.next();
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = Object(u.a)(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected.` +
              " You can provide an Observable, Promise, Array, or Iterable."
          );
        }
        var e, n, l;
      };
    },
    SpAZ: function (t, e, n) {
      "use strict";
      function r(t) {
        return t;
      }
      n.d(e, "a", function () {
        return r;
      });
    },
    XNiG: function (t, e, n) {
      "use strict";
      n.d(e, "b", function () {
        return u;
      }),
        n.d(e, "a", function () {
          return l;
        });
      var r = n("HDdC"),
        s = n("7o/Q"),
        i = n("quSY"),
        o = n("9ppp"),
        a = n("Ylt2"),
        c = n("2QA8");
      class u extends s.a {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let l = (() => {
        class t extends r.a {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [c.a]() {
            return new u(this);
          }
          lift(t) {
            const e = new h(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new o.a();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new o.a();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new o.a();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new o.a();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new o.a();
            return this.hasError
              ? (t.error(this.thrownError), i.a.EMPTY)
              : this.isStopped
              ? (t.complete(), i.a.EMPTY)
              : (this.observers.push(t), new a.a(this, t));
          }
          asObservable() {
            const t = new r.a();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new h(t, e)), t;
      })();
      class h extends l {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : i.a.EMPTY;
        }
      }
    },
    XoHu: function (t, e, n) {
      "use strict";
      function r(t) {
        return null !== t && "object" == typeof t;
      }
      n.d(e, "a", function () {
        return r;
      });
    },
    Ylt2: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return s;
      });
      var r = n("quSY");
      class s extends r.a {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
    },
    ZUHj: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return o;
      });
      var r = n("51Dv"),
        s = n("SeVD"),
        i = n("HDdC");
      function o(t, e, n, o, a = new r.a(t, n, o)) {
        if (!a.closed)
          return e instanceof i.a ? e.subscribe(a) : Object(s.a)(e)(a);
      }
    },
    bHdf: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      var r = n("5+tZ"),
        s = n("SpAZ");
      function i(t = Number.POSITIVE_INFINITY) {
        return Object(r.a)(s.a, t);
      }
    },
    c2HN: function (t, e, n) {
      "use strict";
      function r(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      n.d(e, "a", function () {
        return r;
      });
    },
    eIep: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return c;
      });
      var r = n("l7GE"),
        s = n("51Dv"),
        i = n("ZUHj"),
        o = n("lJxs"),
        a = n("Cfvw");
      function c(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(
                c((n, r) =>
                  Object(a.a)(t(n, r)).pipe(
                    Object(o.a)((t, s) => e(n, t, r, s))
                  )
                )
              )
          : (e) => e.lift(new u(t));
      }
      class u {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new l(t, this.project));
        }
      }
      class l extends r.a {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const r = this.innerSubscription;
          r && r.unsubscribe();
          const o = new s.a(this, e, n),
            a = this.destination;
          a.add(o),
            (this.innerSubscription = Object(i.a)(this, t, void 0, void 0, o)),
            this.innerSubscription !== o && a.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = null;
        }
        notifyComplete(t) {
          this.destination.remove(t),
            (this.innerSubscription = null),
            this.isStopped && super._complete();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
      }
    },
    eNvI: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, "LoaderModule", function () {
          return tt;
        });
      var r = n("ofXK"),
        s = n("tyNb"),
        i = n("fXoL"),
        o = n("XNiG"),
        a = n("quSY");
      class c extends a.a {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class u extends c {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            r = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(r, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(r, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n = !1,
            r = void 0;
          try {
            this.work(t);
          } catch (s) {
            (n = !0), (r = (!!s && s) || new Error(s));
          }
          if (n) return this.unsubscribe(), r;
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            r = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== r && n.splice(r, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }
      }
      class l extends u {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e);
        }
        schedule(t, e = 0) {
          return e > 0
            ? super.schedule(t, e)
            : ((this.delay = e),
              (this.state = t),
              this.scheduler.flush(this),
              this);
        }
        execute(t, e) {
          return e > 0 || this.closed
            ? super.execute(t, e)
            : this._execute(t, e);
        }
        requestAsyncId(t, e, n = 0) {
          return (null !== n && n > 0) || (null === n && this.delay > 0)
            ? super.requestAsyncId(t, e, n)
            : t.flush(this);
        }
      }
      let h = (() => {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class d extends h {
        constructor(t, e = h.now) {
          super(t, () =>
            d.delegate && d.delegate !== this ? d.delegate.now() : e()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return d.delegate && d.delegate !== this
            ? d.delegate.schedule(t, e, n)
            : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      class f extends d {}
      const p = new f(l);
      var g = n("7o/Q"),
        m = n("EY2u"),
        b = n("LRne"),
        y = n("HDdC");
      let v = (() => {
        class t {
          constructor(t, e, n) {
            (this.kind = t),
              (this.value = e),
              (this.error = n),
              (this.hasValue = "N" === t);
          }
          observe(t) {
            switch (this.kind) {
              case "N":
                return t.next && t.next(this.value);
              case "E":
                return t.error && t.error(this.error);
              case "C":
                return t.complete && t.complete();
            }
          }
          do(t, e, n) {
            switch (this.kind) {
              case "N":
                return t && t(this.value);
              case "E":
                return e && e(this.error);
              case "C":
                return n && n();
            }
          }
          accept(t, e, n) {
            return t && "function" == typeof t.next
              ? this.observe(t)
              : this.do(t, e, n);
          }
          toObservable() {
            switch (this.kind) {
              case "N":
                return Object(b.a)(this.value);
              case "E":
                return (t = this.error), new y.a((e) => e.error(t));
              case "C":
                return Object(m.b)();
            }
            var t;
            throw new Error("unexpected notification kind value");
          }
          static createNext(e) {
            return void 0 !== e ? new t("N", e) : t.undefinedValueNotification;
          }
          static createError(e) {
            return new t("E", void 0, e);
          }
          static createComplete() {
            return t.completeNotification;
          }
        }
        return (
          (t.completeNotification = new t("C")),
          (t.undefinedValueNotification = new t("N", void 0)),
          t
        );
      })();
      class w extends g.a {
        constructor(t, e, n = 0) {
          super(t), (this.scheduler = e), (this.delay = n);
        }
        static dispatch(t) {
          const { notification: e, destination: n } = t;
          e.observe(n), this.unsubscribe();
        }
        scheduleMessage(t) {
          this.destination.add(
            this.scheduler.schedule(
              w.dispatch,
              this.delay,
              new _(t, this.destination)
            )
          );
        }
        _next(t) {
          this.scheduleMessage(v.createNext(t));
        }
        _error(t) {
          this.scheduleMessage(v.createError(t)), this.unsubscribe();
        }
        _complete() {
          this.scheduleMessage(v.createComplete()), this.unsubscribe();
        }
      }
      class _ {
        constructor(t, e) {
          (this.notification = t), (this.destination = e);
        }
      }
      var C = n("9ppp"),
        S = n("Ylt2");
      class x extends o.a {
        constructor(
          t = Number.POSITIVE_INFINITY,
          e = Number.POSITIVE_INFINITY,
          n
        ) {
          super(),
            (this.scheduler = n),
            (this._events = []),
            (this._infiniteTimeWindow = !1),
            (this._bufferSize = t < 1 ? 1 : t),
            (this._windowTime = e < 1 ? 1 : e),
            e === Number.POSITIVE_INFINITY
              ? ((this._infiniteTimeWindow = !0),
                (this.next = this.nextInfiniteTimeWindow))
              : (this.next = this.nextTimeWindow);
        }
        nextInfiniteTimeWindow(t) {
          const e = this._events;
          e.push(t), e.length > this._bufferSize && e.shift(), super.next(t);
        }
        nextTimeWindow(t) {
          this._events.push(new O(this._getNow(), t)),
            this._trimBufferThenGetEvents(),
            super.next(t);
        }
        _subscribe(t) {
          const e = this._infiniteTimeWindow,
            n = e ? this._events : this._trimBufferThenGetEvents(),
            r = this.scheduler,
            s = n.length;
          let i;
          if (this.closed) throw new C.a();
          if (
            (this.isStopped || this.hasError
              ? (i = a.a.EMPTY)
              : (this.observers.push(t), (i = new S.a(this, t))),
            r && t.add((t = new w(t, r))),
            e)
          )
            for (let o = 0; o < s && !t.closed; o++) t.next(n[o]);
          else for (let o = 0; o < s && !t.closed; o++) t.next(n[o].value);
          return (
            this.hasError
              ? t.error(this.thrownError)
              : this.isStopped && t.complete(),
            i
          );
        }
        _getNow() {
          return (this.scheduler || p).now();
        }
        _trimBufferThenGetEvents() {
          const t = this._getNow(),
            e = this._bufferSize,
            n = this._windowTime,
            r = this._events,
            s = r.length;
          let i = 0;
          for (; i < s && !(t - r[i].time < n); ) i++;
          return s > e && (i = Math.max(i, s - e)), i > 0 && r.splice(0, i), r;
        }
      }
      class O {
        constructor(t, e) {
          (this.time = t), (this.value = e);
        }
      }
      var E = n("eIep");
      function T(t, e, n) {
        let r;
        return (
          (r =
            t && "object" == typeof t
              ? t
              : { bufferSize: t, windowTime: e, refCount: !1, scheduler: n }),
          (t) =>
            t.lift(
              (function ({
                bufferSize: t = Number.POSITIVE_INFINITY,
                windowTime: e = Number.POSITIVE_INFINITY,
                refCount: n,
                scheduler: r,
              }) {
                let s,
                  i,
                  o = 0,
                  a = !1,
                  c = !1;
                return function (u) {
                  o++,
                    (s && !a) ||
                      ((a = !1),
                      (s = new x(t, e, r)),
                      (i = u.subscribe({
                        next(t) {
                          s.next(t);
                        },
                        error(t) {
                          (a = !0), s.error(t);
                        },
                        complete() {
                          (c = !0), (i = void 0), s.complete();
                        },
                      })));
                  const l = s.subscribe(this);
                  this.add(() => {
                    o--,
                      l.unsubscribe(),
                      i &&
                        !c &&
                        n &&
                        0 === o &&
                        (i.unsubscribe(), (i = void 0), (s = void 0));
                  });
                };
              })(r)
            )
        );
      }
      var j = n("lJxs");
      const I = new d(u);
      function A(t, e = I) {
        var n;
        const r =
          (n = t) instanceof Date && !isNaN(+n) ? +t - e.now() : Math.abs(t);
        return (t) => t.lift(new k(r, e));
      }
      class k {
        constructor(t, e) {
          (this.delay = t), (this.scheduler = e);
        }
        call(t, e) {
          return e.subscribe(new R(t, this.delay, this.scheduler));
        }
      }
      class R extends g.a {
        constructor(t, e, n) {
          super(t),
            (this.delay = e),
            (this.scheduler = n),
            (this.queue = []),
            (this.active = !1),
            (this.errored = !1);
        }
        static dispatch(t) {
          const e = t.source,
            n = e.queue,
            r = t.scheduler,
            s = t.destination;
          for (; n.length > 0 && n[0].time - r.now() <= 0; )
            n.shift().notification.observe(s);
          if (n.length > 0) {
            const e = Math.max(0, n[0].time - r.now());
            this.schedule(t, e);
          } else this.unsubscribe(), (e.active = !1);
        }
        _schedule(t) {
          (this.active = !0),
            this.destination.add(
              t.schedule(R.dispatch, this.delay, {
                source: this,
                destination: this.destination,
                scheduler: t,
              })
            );
        }
        scheduleNotification(t) {
          if (!0 === this.errored) return;
          const e = this.scheduler,
            n = new N(e.now() + this.delay, t);
          this.queue.push(n), !1 === this.active && this._schedule(e);
        }
        _next(t) {
          this.scheduleNotification(v.createNext(t));
        }
        _error(t) {
          (this.errored = !0),
            (this.queue = []),
            this.destination.error(t),
            this.unsubscribe();
        }
        _complete() {
          this.scheduleNotification(v.createComplete()), this.unsubscribe();
        }
      }
      class N {
        constructor(t, e) {
          (this.time = t), (this.notification = e);
        }
      }
      const P = [
          "Kote\u0142",
          "Piese\u0142",
          "Pawe\u0142",
          "Tygryse\u0142",
          "Puchatke",
          "Bazylia",
          "Oregano",
          "Frytki xD",
        ],
        D = ["Zwierz\u0119ta", "Nie-zwierz\u0119ta"];
      var U = n("GyhO"),
        L = n("itXk");
      const M = (t) =>
        Object(U.a)(
          Object(b.a)({ type: "start" }),
          t.pipe(Object(j.a)((t) => ({ type: "finish", value: t })))
        );
      let H = (() => {
        class t {
          constructor() {
            var t, e;
            (this.fetchProductsAction = new x(1)),
              (this.fetchCategoriesAction = new x(1)),
              (this.products$ = this.fetchProductsAction.pipe(
                Object(E.a)(() => M(this.getProducts())),
                T(1)
              )),
              (this.categories$ = this.fetchCategoriesAction.pipe(
                Object(E.a)(() => M(this.getCategories())),
                T(1)
              )),
              (this.structuredProducts$ = ((e = [
                this.products$,
                this.categories$,
              ]),
              Object(L.a)(e).pipe(
                Object(j.a)((t) => ({
                  type: t.find((t) => "start" === t.type) ? "start" : "finish",
                  value: t.map((t) => t.value),
                }))
              )).pipe(
                ((t = Object(j.a)(([t, e]) => ({
                  products: t,
                  categories: e,
                }))),
                function (e) {
                  return e.pipe(
                    (function (...t) {
                      const e = t.length;
                      if (0 === e)
                        throw new Error("list of properties cannot be empty.");
                      return (n) =>
                        Object(j.a)(
                          (function (t, e) {
                            return (n) => {
                              let r = n;
                              for (let s = 0; s < e; s++) {
                                const e = r[t[s]];
                                if (void 0 === e) return;
                                r = e;
                              }
                              return r;
                            };
                          })(t, e)
                        )(n);
                    })("value"),
                    t,
                    Object(E.a)((t) =>
                      e.pipe(
                        Object(j.a)((e) =>
                          Object.assign(Object.assign({}, e), { value: t })
                        )
                      )
                    ),
                    T(1)
                  );
                })
              ));
          }
          fetchProducts() {
            this.fetchProductsAction.next();
          }
          fetchCategories() {
            this.fetchCategoriesAction.next();
          }
          getProducts() {
            return Object(b.a)(P).pipe(A(1e3));
          }
          getCategories() {
            return Object(b.a)(D).pipe(A(2e3));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = i.Eb({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      var V = n("JX91"),
        F = n("JIr8");
      let $ = (() => {
        class t {
          transform(t) {
            return (e = t) &&
              (e instanceof y.a ||
                ("function" == typeof e.lift &&
                  "function" == typeof e.subscribe))
              ? t.pipe(
                  Object(j.a)((t) => ({
                    loading: "start" === t.type,
                    value: t.type ? t.value : t,
                  })),
                  Object(V.a)({ loading: !0 }),
                  Object(F.a)((t) => Object(b.a)({ loading: !1, error: t }))
                )
              : t;
            var e;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵpipe = i.Hb({ name: "withLoading", type: t, pure: !0 })),
          t
        );
      })();
      function z(t, e) {
        if ((1 & t && (i.gc(0), i.Vb(1, "json")), 2 & t)) {
          const t = i.Ub().ngIf;
          i.hc(" ", i.Wb(1, 1, t.value), " ");
        }
      }
      function q(t, e) {
        1 & t && i.gc(0, "Loading...");
      }
      function B(t, e) {
        if (
          (1 & t &&
            (i.Lb(0, "div"),
            i.fc(1, z, 2, 3, "ng-template", 5),
            i.fc(2, q, 1, 0, "ng-template", 5),
            i.Kb()),
          2 & t)
        ) {
          const t = e.ngIf;
          i.zb(1), i.Zb("ngIf", t.value), i.zb(1), i.Zb("ngIf", t.loading);
        }
      }
      function Z(t, e) {
        if ((1 & t && (i.gc(0), i.Vb(1, "json")), 2 & t)) {
          const t = i.Ub().ngIf;
          i.hc(" ", i.Wb(1, 1, t.value), " ");
        }
      }
      function W(t, e) {
        1 & t && i.gc(0, "Loading...");
      }
      function G(t, e) {
        if (
          (1 & t &&
            (i.Lb(0, "div"),
            i.fc(1, Z, 2, 3, "ng-template", 5),
            i.fc(2, W, 1, 0, "ng-template", 5),
            i.Kb()),
          2 & t)
        ) {
          const t = e.ngIf;
          i.zb(1), i.Zb("ngIf", t.value), i.zb(1), i.Zb("ngIf", t.loading);
        }
      }
      function Q(t, e) {
        if ((1 & t && (i.gc(0), i.Vb(1, "json")), 2 & t)) {
          const t = i.Ub().ngIf;
          i.hc(" ", i.Wb(1, 1, t.value), " ");
        }
      }
      function J(t, e) {
        1 & t && i.gc(0, "Loading...");
      }
      function Y(t, e) {
        if (
          (1 & t &&
            (i.Lb(0, "div"),
            i.fc(1, Q, 2, 3, "ng-template", 5),
            i.fc(2, J, 1, 0, "ng-template", 5),
            i.Kb()),
          2 & t)
        ) {
          const t = e.ngIf;
          i.zb(1), i.Zb("ngIf", !t.loading), i.zb(1), i.Zb("ngIf", t.loading);
        }
      }
      const K = [
        {
          path: "",
          pathMatch: "full",
          component: (() => {
            class t {
              constructor(t) {
                (this.productsService = t),
                  (this.products$ = this.productsService.products$),
                  (this.categories$ = this.productsService.categories$),
                  (this.structuredProducts$ = this.productsService.structuredProducts$),
                  this.productsService.fetchProducts(),
                  this.productsService.fetchCategories();
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(i.Ib(H));
              }),
              (t.ɵcmp = i.Cb({
                type: t,
                selectors: [["app-loader-wrapper"]],
                decls: 20,
                vars: 15,
                consts: [
                  [1, "title"],
                  [1, "search-bar"],
                  [3, "input"],
                  [1, "results"],
                  [4, "ngIf"],
                  [3, "ngIf"],
                ],
                template: function (t, e) {
                  1 & t &&
                    (i.Lb(0, "h2", 0),
                    i.gc(1, "Products"),
                    i.Kb(),
                    i.Lb(2, "div", 1),
                    i.Lb(3, "input", 2),
                    i.Sb("input", function () {
                      return e.productsService.fetchProducts();
                    }),
                    i.Kb(),
                    i.Kb(),
                    i.Lb(4, "div", 3),
                    i.Lb(5, "h3"),
                    i.gc(6, "Products"),
                    i.Kb(),
                    i.fc(7, B, 3, 2, "div", 4),
                    i.Vb(8, "async"),
                    i.Vb(9, "withLoading"),
                    i.Lb(10, "h3"),
                    i.gc(11, "Categories"),
                    i.Kb(),
                    i.fc(12, G, 3, 2, "div", 4),
                    i.Vb(13, "async"),
                    i.Vb(14, "withLoading"),
                    i.Lb(15, "h3"),
                    i.gc(16, "Structure"),
                    i.Kb(),
                    i.fc(17, Y, 3, 2, "div", 4),
                    i.Vb(18, "async"),
                    i.Vb(19, "withLoading"),
                    i.Kb()),
                    2 & t &&
                      (i.zb(7),
                      i.Zb("ngIf", i.Wb(8, 3, i.Wb(9, 5, e.products$))),
                      i.zb(5),
                      i.Zb("ngIf", i.Wb(13, 7, i.Wb(14, 9, e.categories$))),
                      i.zb(5),
                      i.Zb(
                        "ngIf",
                        i.Wb(18, 11, i.Wb(19, 13, e.structuredProducts$))
                      ));
                },
                directives: [r.j],
                pipes: [r.b, $, r.f],
                styles: [""],
              })),
              t
            );
          })(),
        },
      ];
      let X = (() => {
          class t {}
          return (
            (t.ɵmod = i.Gb({ type: t })),
            (t.ɵinj = i.Fb({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[s.b.forChild(K)], s.b],
            })),
            t
          );
        })(),
        tt = (() => {
          class t {}
          return (
            (t.ɵmod = i.Gb({ type: t })),
            (t.ɵinj = i.Fb({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[r.c, X]],
            })),
            t
          );
        })();
    },
    fXoL: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return ui;
      }),
        n.d(e, "b", function () {
          return Da;
        }),
        n.d(e, "c", function () {
          return Aa;
        }),
        n.d(e, "d", function () {
          return ja;
        }),
        n.d(e, "e", function () {
          return Ia;
        }),
        n.d(e, "f", function () {
          return Tc;
        }),
        n.d(e, "g", function () {
          return bc;
        }),
        n.d(e, "h", function () {
          return Zs;
        }),
        n.d(e, "i", function () {
          return Za;
        }),
        n.d(e, "j", function () {
          return uo;
        }),
        n.d(e, "k", function () {
          return Ma;
        }),
        n.d(e, "l", function () {
          return lo;
        }),
        n.d(e, "m", function () {
          return bn;
        }),
        n.d(e, "n", function () {
          return aa;
        }),
        n.d(e, "o", function () {
          return et;
        }),
        n.d(e, "p", function () {
          return v;
        }),
        n.d(e, "q", function () {
          return tt;
        }),
        n.d(e, "r", function () {
          return ci;
        }),
        n.d(e, "s", function () {
          return Ao;
        }),
        n.d(e, "t", function () {
          return ko;
        }),
        n.d(e, "u", function () {
          return La;
        }),
        n.d(e, "v", function () {
          return gt;
        }),
        n.d(e, "w", function () {
          return vc;
        }),
        n.d(e, "x", function () {
          return pt;
        }),
        n.d(e, "y", function () {
          return dc;
        }),
        n.d(e, "z", function () {
          return Ja;
        }),
        n.d(e, "A", function () {
          return w;
        }),
        n.d(e, "B", function () {
          return Pa;
        }),
        n.d(e, "C", function () {
          return Na;
        }),
        n.d(e, "D", function () {
          return go;
        }),
        n.d(e, "E", function () {
          return fo;
        }),
        n.d(e, "F", function () {
          return po;
        }),
        n.d(e, "G", function () {
          return bo;
        }),
        n.d(e, "H", function () {
          return sr;
        }),
        n.d(e, "I", function () {
          return C;
        }),
        n.d(e, "J", function () {
          return Cc;
        }),
        n.d(e, "K", function () {
          return Do;
        }),
        n.d(e, "L", function () {
          return sc;
        }),
        n.d(e, "M", function () {
          return yo;
        }),
        n.d(e, "N", function () {
          return Lo;
        }),
        n.d(e, "O", function () {
          return _t;
        }),
        n.d(e, "P", function () {
          return bi;
        }),
        n.d(e, "Q", function () {
          return fc;
        }),
        n.d(e, "R", function () {
          return Dn;
        }),
        n.d(e, "S", function () {
          return H;
        }),
        n.d(e, "T", function () {
          return Pn;
        }),
        n.d(e, "U", function () {
          return Oc;
        }),
        n.d(e, "V", function () {
          return ac;
        }),
        n.d(e, "W", function () {
          return Ua;
        }),
        n.d(e, "X", function () {
          return Gs;
        }),
        n.d(e, "Y", function () {
          return Xo;
        }),
        n.d(e, "Z", function () {
          return nr;
        }),
        n.d(e, "ab", function () {
          return ar;
        }),
        n.d(e, "bb", function () {
          return Hn;
        }),
        n.d(e, "cb", function () {
          return On;
        }),
        n.d(e, "db", function () {
          return Tn;
        }),
        n.d(e, "eb", function () {
          return kn;
        }),
        n.d(e, "fb", function () {
          return In;
        }),
        n.d(e, "gb", function () {
          return jn;
        }),
        n.d(e, "hb", function () {
          return An;
        }),
        n.d(e, "ib", function () {
          return Qo;
        }),
        n.d(e, "jb", function () {
          return xc;
        }),
        n.d(e, "kb", function () {
          return Jo;
        }),
        n.d(e, "lb", function () {
          return Yo;
        }),
        n.d(e, "mb", function () {
          return En;
        }),
        n.d(e, "nb", function () {
          return Z;
        }),
        n.d(e, "ob", function () {
          return yi;
        }),
        n.d(e, "pb", function () {
          return Ri;
        }),
        n.d(e, "qb", function () {
          return ki;
        }),
        n.d(e, "rb", function () {
          return mi;
        }),
        n.d(e, "sb", function () {
          return Go;
        }),
        n.d(e, "tb", function () {
          return Bt;
        }),
        n.d(e, "ub", function () {
          return U;
        }),
        n.d(e, "vb", function () {
          return xn;
        }),
        n.d(e, "wb", function () {
          return qi;
        }),
        n.d(e, "xb", function () {
          return Ji;
        }),
        n.d(e, "yb", function () {
          return oo;
        }),
        n.d(e, "zb", function () {
          return Or;
        }),
        n.d(e, "Ab", function () {
          return _i;
        }),
        n.d(e, "Bb", function () {
          return Ca;
        }),
        n.d(e, "Cb", function () {
          return Ot;
        }),
        n.d(e, "Db", function () {
          return Rt;
        }),
        n.d(e, "Eb", function () {
          return E;
        }),
        n.d(e, "Fb", function () {
          return T;
        }),
        n.d(e, "Gb", function () {
          return It;
        }),
        n.d(e, "Hb", function () {
          return Nt;
        }),
        n.d(e, "Ib", function () {
          return Si;
        }),
        n.d(e, "Jb", function () {
          return Ai;
        }),
        n.d(e, "Kb", function () {
          return Ii;
        }),
        n.d(e, "Lb", function () {
          return ji;
        }),
        n.d(e, "Mb", function () {
          return fn;
        }),
        n.d(e, "Nb", function () {
          return $i;
        }),
        n.d(e, "Ob", function () {
          return lt;
        }),
        n.d(e, "Pb", function () {
          return xi;
        }),
        n.d(e, "Qb", function () {
          return Ta;
        }),
        n.d(e, "Rb", function () {
          return Oi;
        }),
        n.d(e, "Sb", function () {
          return Ni;
        }),
        n.d(e, "Tb", function () {
          return Sa;
        }),
        n.d(e, "Ub", function () {
          return Ui;
        }),
        n.d(e, "Vb", function () {
          return ia;
        }),
        n.d(e, "Wb", function () {
          return oa;
        }),
        n.d(e, "Xb", function () {
          return Hi;
        }),
        n.d(e, "Yb", function () {
          return Mi;
        }),
        n.d(e, "Zb", function () {
          return Ei;
        }),
        n.d(e, "ac", function () {
          return ya;
        }),
        n.d(e, "bc", function () {
          return Ge;
        }),
        n.d(e, "cc", function () {
          return cr;
        }),
        n.d(e, "dc", function () {
          return At;
        }),
        n.d(e, "ec", function () {
          return va;
        }),
        n.d(e, "fc", function () {
          return Ci;
        }),
        n.d(e, "gc", function () {
          return Vi;
        }),
        n.d(e, "hc", function () {
          return Fi;
        }),
        n.d(e, "ic", function () {
          return wa;
        });
      var r = n("XNiG"),
        s = n("quSY"),
        i = n("HDdC"),
        o = n("z+Ro"),
        a = n("bHdf"),
        c = n("yCtX"),
        u = n("7o/Q");
      function l() {
        return function (t) {
          return t.lift(new h(t));
        };
      }
      class h {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new d(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class d extends u.a {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class f extends i.a {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new s.a()),
              t.add(this.source.subscribe(new g(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = s.a.EMPTY))),
            t
          );
        }
        refCount() {
          return l()(this);
        }
      }
      const p = (() => {
        const t = f.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class g extends r.b {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function m() {
        return new r.a();
      }
      function b(t) {
        return { toString: t }.toString();
      }
      function y(t, e, n) {
        return b(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const s = t.hasOwnProperty("__parameters__")
                ? t.__parameters__
                : Object.defineProperty(t, "__parameters__", { value: [] })
                    .__parameters__;
              for (; s.length <= r; ) s.push(null);
              return (s[r] = s[r] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      const v = y("Inject", (t) => ({ token: t })),
        w = y("Optional"),
        _ = y("Self"),
        C = y("SkipSelf");
      var S = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      function x(t) {
        for (let e in t) if (t[e] === x) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function O(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function E(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function T(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function j(t) {
        return I(t, t[k]) || I(t, t[P]);
      }
      function I(t, e) {
        return e && e.token === t ? e : null;
      }
      function A(t) {
        return t && (t.hasOwnProperty(R) || t.hasOwnProperty(D)) ? t[R] : null;
      }
      const k = x({ ɵprov: x }),
        R = x({ ɵinj: x }),
        N = x({ ɵprovFallback: x }),
        P = x({ ngInjectableDef: x }),
        D = x({ ngInjectorDef: x });
      function U(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(U).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function L(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const M = x({ __forward_ref__: x });
      function H(t) {
        return (
          (t.__forward_ref__ = H),
          (t.toString = function () {
            return U(this());
          }),
          t
        );
      }
      function V(t) {
        return F(t) ? t() : t;
      }
      function F(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(M) &&
          t.__forward_ref__ === H
        );
      }
      const $ = "undefined" != typeof globalThis && globalThis,
        z = "undefined" != typeof window && window,
        q =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        B = "undefined" != typeof global && global,
        Z = $ || B || z || q,
        W = x({ ɵcmp: x }),
        G = x({ ɵdir: x }),
        Q = x({ ɵpipe: x }),
        J = x({ ɵmod: x }),
        Y = x({ ɵloc: x }),
        K = x({ ɵfac: x }),
        X = x({ __NG_ELEMENT_ID__: x });
      class tt {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = E({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const et = new tt("INJECTOR", -1),
        nt = {},
        rt = /\n/gm,
        st = x({ provide: String, useValue: x });
      let it,
        ot = void 0;
      function at(t) {
        const e = ot;
        return (ot = t), e;
      }
      function ct(t) {
        const e = it;
        return (it = t), e;
      }
      function ut(t, e = S.Default) {
        if (void 0 === ot)
          throw new Error("inject() must be called from an injection context");
        return null === ot
          ? ht(t, void 0, e)
          : ot.get(t, e & S.Optional ? null : void 0, e);
      }
      function lt(t, e = S.Default) {
        return (it || ut)(V(t), e);
      }
      function ht(t, e, n) {
        const r = j(t);
        if (r && "root" == r.providedIn)
          return void 0 === r.value ? (r.value = r.factory()) : r.value;
        if (n & S.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${U(t)}]`);
      }
      function dt(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = V(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = S.Default;
            for (let e = 0; e < r.length; e++) {
              const s = r[e];
              s instanceof w || "Optional" === s.ngMetadataName || s === w
                ? (n |= S.Optional)
                : s instanceof C || "SkipSelf" === s.ngMetadataName || s === C
                ? (n |= S.SkipSelf)
                : s instanceof _ || "Self" === s.ngMetadataName || s === _
                ? (n |= S.Self)
                : (t = s instanceof v || s === v ? s.token : s);
            }
            e.push(lt(t, n));
          } else e.push(lt(r));
        }
        return e;
      }
      class ft {
        get(t, e = nt) {
          if (e === nt) {
            const e = new Error(`NullInjectorError: No provider for ${U(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      class pt {}
      class gt {}
      function mt(t, e) {
        t.forEach((t) => (Array.isArray(t) ? mt(t, e) : e(t)));
      }
      function bt(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function yt(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function vt(t, e) {
        const n = [];
        for (let r = 0; r < t; r++) n.push(e);
        return n;
      }
      const wt = (function () {
          var t = { OnPush: 0, Default: 1 };
          return (t[t.OnPush] = "OnPush"), (t[t.Default] = "Default"), t;
        })(),
        _t = (function () {
          var t = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
          return (
            (t[t.Emulated] = "Emulated"),
            (t[t.Native] = "Native"),
            (t[t.None] = "None"),
            (t[t.ShadowDom] = "ShadowDom"),
            t
          );
        })(),
        Ct = {},
        St = [];
      let xt = 0;
      function Ot(t) {
        return b(() => {
          const e = t.type,
            n = e.prototype,
            r = {},
            s = {
              type: e,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onChanges: null,
              onInit: n.ngOnInit || null,
              doCheck: n.ngDoCheck || null,
              afterContentInit: n.ngAfterContentInit || null,
              afterContentChecked: n.ngAfterContentChecked || null,
              afterViewInit: n.ngAfterViewInit || null,
              afterViewChecked: n.ngAfterViewChecked || null,
              onDestroy: n.ngOnDestroy || null,
              onPush: t.changeDetection === wt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || St,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || _t.Emulated,
              id: "c",
              styles: t.styles || St,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            i = t.directives,
            o = t.features,
            a = t.pipes;
          return (
            (s.id += xt++),
            (s.inputs = kt(t.inputs, r)),
            (s.outputs = kt(t.outputs)),
            o && o.forEach((t) => t(s)),
            (s.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Et)
              : null),
            (s.pipeDefs = a
              ? () => ("function" == typeof a ? a() : a).map(Tt)
              : null),
            s
          );
        });
      }
      function Et(t) {
        return (
          Pt(t) ||
          (function (t) {
            return t[G] || null;
          })(t)
        );
      }
      function Tt(t) {
        return (function (t) {
          return t[Q] || null;
        })(t);
      }
      const jt = {};
      function It(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || St,
          declarations: t.declarations || St,
          imports: t.imports || St,
          exports: t.exports || St,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            b(() => {
              jt[t.id] = t.type;
            }),
          e
        );
      }
      function At(t, e) {
        return b(() => {
          const n = Ut(t, !0);
          (n.declarations = e.declarations || St),
            (n.imports = e.imports || St),
            (n.exports = e.exports || St);
        });
      }
      function kt(t, e) {
        if (null == t) return Ct;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              i = s;
            Array.isArray(s) && ((i = s[1]), (s = s[0])),
              (n[s] = r),
              e && (e[s] = i);
          }
        return n;
      }
      const Rt = Ot;
      function Nt(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function Pt(t) {
        return t[W] || null;
      }
      function Dt(t, e) {
        return t.hasOwnProperty(K) ? t[K] : null;
      }
      function Ut(t, e) {
        const n = t[J] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${U(t)} does not have '\u0275mod' property.`);
        return n;
      }
      function Lt(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Mt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Ht(t) {
        return 0 != (8 & t.flags);
      }
      function Vt(t) {
        return 2 == (2 & t.flags);
      }
      function Ft(t) {
        return 1 == (1 & t.flags);
      }
      function $t(t) {
        return null !== t.template;
      }
      function zt(t) {
        return 0 != (512 & t[2]);
      }
      let qt = void 0;
      function Bt(t) {
        qt = t;
      }
      function Zt(t) {
        return !!t.listen;
      }
      const Wt = {
        createRenderer: (t, e) =>
          void 0 !== qt
            ? qt
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function Gt(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Qt(t, e) {
        return Gt(e[t.index]);
      }
      function Jt(t, e) {
        return t.data[e + 20];
      }
      function Yt(t, e) {
        const n = e[t];
        return Lt(n) ? n : n[0];
      }
      function Kt(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Xt(t) {
        return 4 == (4 & t[2]);
      }
      function te(t) {
        return 128 == (128 & t[2]);
      }
      function ee(t, e) {
        return null === t || null == e ? null : t[e];
      }
      function ne(t) {
        t[18] = 0;
      }
      function re(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const se = {
        lFrame: Ce(null),
        bindingsEnabled: !0,
        checkNoChangesMode: !1,
      };
      function ie() {
        return se.bindingsEnabled;
      }
      function oe() {
        return se.lFrame.lView;
      }
      function ae() {
        return se.lFrame.tView;
      }
      function ce() {
        return se.lFrame.previousOrParentTNode;
      }
      function ue(t, e) {
        (se.lFrame.previousOrParentTNode = t), (se.lFrame.isParent = e);
      }
      function le() {
        return se.lFrame.isParent;
      }
      function he() {
        se.lFrame.isParent = !1;
      }
      function de() {
        return se.checkNoChangesMode;
      }
      function fe(t) {
        se.checkNoChangesMode = t;
      }
      function pe() {
        return se.lFrame.bindingIndex++;
      }
      function ge(t, e) {
        const n = se.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), me(e);
      }
      function me(t) {
        se.lFrame.currentDirectiveIndex = t;
      }
      function be() {
        return se.lFrame.currentQueryIndex;
      }
      function ye(t) {
        se.lFrame.currentQueryIndex = t;
      }
      function ve(t, e) {
        const n = _e();
        (se.lFrame = n), (n.previousOrParentTNode = e), (n.lView = t);
      }
      function we(t, e) {
        const n = _e(),
          r = t[1];
        (se.lFrame = n),
          (n.previousOrParentTNode = e),
          (n.lView = t),
          (n.tView = r),
          (n.contextLView = t),
          (n.bindingIndex = r.bindingStartIndex);
      }
      function _e() {
        const t = se.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Ce(t) : e;
      }
      function Ce(t) {
        const e = {
          previousOrParentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: 0,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentSanitizer: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
        };
        return null !== t && (t.child = e), e;
      }
      function Se() {
        const t = se.lFrame;
        return (
          (se.lFrame = t.parent),
          (t.previousOrParentTNode = null),
          (t.lView = null),
          t
        );
      }
      const xe = Se;
      function Oe() {
        const t = Se();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = 0),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.currentSanitizer = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function Ee() {
        return se.lFrame.selectedIndex;
      }
      function Te(t) {
        se.lFrame.selectedIndex = t;
      }
      function je() {
        const t = se.lFrame;
        return Jt(t.tView, t.selectedIndex);
      }
      function Ie(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n];
          e.afterContentInit &&
            (t.contentHooks || (t.contentHooks = [])).push(
              -n,
              e.afterContentInit
            ),
            e.afterContentChecked &&
              ((t.contentHooks || (t.contentHooks = [])).push(
                n,
                e.afterContentChecked
              ),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(
                n,
                e.afterContentChecked
              )),
            e.afterViewInit &&
              (t.viewHooks || (t.viewHooks = [])).push(-n, e.afterViewInit),
            e.afterViewChecked &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, e.afterViewChecked),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(
                n,
                e.afterViewChecked
              )),
            null != e.onDestroy &&
              (t.destroyHooks || (t.destroyHooks = [])).push(n, e.onDestroy);
        }
      }
      function Ae(t, e, n) {
        Ne(t, e, 3, n);
      }
      function ke(t, e, n, r) {
        (3 & t[2]) === n && Ne(t, e, n, r);
      }
      function Re(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function Ne(t, e, n, r) {
        const s = null != r ? r : -1;
        let i = 0;
        for (let o = void 0 !== r ? 65535 & t[18] : 0; o < e.length; o++)
          if ("number" == typeof e[o + 1]) {
            if (((i = e[o]), null != r && i >= r)) break;
          } else
            e[o] < 0 && (t[18] += 65536),
              (i < s || -1 == s) &&
                (Pe(t, n, e, o), (t[18] = (4294901760 & t[18]) + o + 2)),
              o++;
      }
      function Pe(t, e, n, r) {
        const s = n[r] < 0,
          i = n[r + 1],
          o = t[s ? -n[r] : n[r]];
        s
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), i.call(o))
          : i.call(o);
      }
      class De {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function Ue(t, e, n) {
        const r = Zt(t);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if ("number" == typeof i) {
            if (0 !== i) break;
            s++;
            const o = n[s++],
              a = n[s++],
              c = n[s++];
            r ? t.setAttribute(e, a, c, o) : e.setAttributeNS(o, a, c);
          } else {
            const o = i,
              a = n[++s];
            Me(o)
              ? r && t.setProperty(e, o, a)
              : r
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              s++;
          }
        }
        return s;
      }
      function Le(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function Me(t) {
        return 64 === t.charCodeAt(0);
      }
      function He(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const s = e[r];
            "number" == typeof s
              ? (n = s)
              : 0 === n ||
                Ve(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function Ve(t, e, n, r, s) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const n = t[i++];
            if ("number" == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s));
            if (r === t[i + 1]) return void (t[i + 2] = s);
          }
          i++, null !== r && i++, null !== s && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== r && t.splice(i++, 0, r),
          null !== s && t.splice(i++, 0, s);
      }
      function Fe(t) {
        return -1 !== t;
      }
      function $e(t) {
        return 32767 & t;
      }
      function ze(t) {
        return t >> 16;
      }
      function qe(t, e) {
        let n = ze(t),
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      function Be(t) {
        return "string" == typeof t ? t : null == t ? "" : "" + t;
      }
      function Ze(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : Be(t);
      }
      const We = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Z))();
      function Ge(t) {
        return { name: "window", target: t.ownerDocument.defaultView };
      }
      function Qe(t) {
        return t instanceof Function ? t() : t;
      }
      let Je = !0;
      function Ye(t) {
        const e = Je;
        return (Je = t), e;
      }
      let Ke = 0;
      function Xe(t, e) {
        const n = en(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          tn(r.data, t),
          tn(e, null),
          tn(r.blueprint, null));
        const s = nn(t, e),
          i = t.injectorIndex;
        if (Fe(s)) {
          const t = $e(s),
            n = qe(s, e),
            r = n[1].data;
          for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s];
        }
        return (e[i + 8] = s), i;
      }
      function tn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function en(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null == e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function nn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = e[6],
          r = 1;
        for (; n && -1 === n.injectorIndex; )
          (n = (e = e[15]) ? e[6] : null), r++;
        return n ? n.injectorIndex | (r << 16) : -1;
      }
      function rn(t, e, n) {
        !(function (t, e, n) {
          let r = "string" != typeof n ? n[X] : n.charCodeAt(0) || 0;
          null == r && (r = n[X] = Ke++);
          const s = 255 & r,
            i = 1 << s,
            o = 64 & s,
            a = 32 & s,
            c = e.data;
          128 & s
            ? o
              ? a
                ? (c[t + 7] |= i)
                : (c[t + 6] |= i)
              : a
              ? (c[t + 5] |= i)
              : (c[t + 4] |= i)
            : o
            ? a
              ? (c[t + 3] |= i)
              : (c[t + 2] |= i)
            : a
            ? (c[t + 1] |= i)
            : (c[t] |= i);
        })(t, e, n);
      }
      function sn(t, e, n, r = S.Default, s) {
        if (null !== t) {
          const s = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t[X];
            return "number" == typeof e && e > 0 ? 255 & e : e;
          })(n);
          if ("function" == typeof s) {
            ve(e, t);
            try {
              const t = s();
              if (null != t || r & S.Optional) return t;
              throw new Error(`No provider for ${Ze(n)}!`);
            } finally {
              xe();
            }
          } else if ("number" == typeof s) {
            if (-1 === s) return new dn(t, e);
            let i = null,
              o = en(t, e),
              a = -1,
              c = r & S.Host ? e[16][6] : null;
            for (
              (-1 === o || r & S.SkipSelf) &&
              ((a = -1 === o ? nn(t, e) : e[o + 8]),
              hn(r, !1) ? ((i = e[1]), (o = $e(a)), (e = qe(a, e))) : (o = -1));
              -1 !== o;

            ) {
              a = e[o + 8];
              const t = e[1];
              if (ln(s, o, t.data)) {
                const t = an(o, e, n, i, r, c);
                if (t !== on) return t;
              }
              hn(r, e[1].data[o + 8] === c) && ln(s, o, e)
                ? ((i = t), (o = $e(a)), (e = qe(a, e)))
                : (o = -1);
            }
          }
        }
        if (
          (r & S.Optional && void 0 === s && (s = null),
          0 == (r & (S.Self | S.Host)))
        ) {
          const t = e[9],
            i = ct(void 0);
          try {
            return t ? t.get(n, s, r & S.Optional) : ht(n, s, r & S.Optional);
          } finally {
            ct(i);
          }
        }
        if (r & S.Optional) return s;
        throw new Error(`NodeInjector: NOT_FOUND [${Ze(n)}]`);
      }
      const on = {};
      function an(t, e, n, r, s, i) {
        const o = e[1],
          a = o.data[t + 8],
          c = cn(
            a,
            o,
            n,
            null == r ? Vt(a) && Je : r != o && 3 === a.type,
            s & S.Host && i === a
          );
        return null !== c ? un(e, o, c, a) : on;
      }
      function cn(t, e, n, r, s) {
        const i = t.providerIndexes,
          o = e.data,
          a = 65535 & i,
          c = t.directiveStart,
          u = i >> 16,
          l = s ? a + u : t.directiveEnd;
        for (let h = r ? a : a + u; h < l; h++) {
          const t = o[h];
          if ((h < c && n === t) || (h >= c && t.type === n)) return h;
        }
        if (s) {
          const t = o[c];
          if (t && $t(t) && t.type === n) return c;
        }
        return null;
      }
      function un(t, e, n, r) {
        let s = t[n];
        const i = e.data;
        if (s instanceof De) {
          const o = s;
          if (o.resolving) throw new Error(`Circular dep for ${Ze(i[n])}`);
          const a = Ye(o.canSeeViewProviders);
          let c;
          (o.resolving = !0), o.injectImpl && (c = ct(o.injectImpl)), ve(t, r);
          try {
            (s = t[n] = o.factory(void 0, i, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const { onChanges: r, onInit: s, doCheck: i } = e;
                  r &&
                    ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                    (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                      t,
                      r
                    )),
                    s &&
                      (n.preOrderHooks || (n.preOrderHooks = [])).push(-t, s),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i));
                })(n, i[n], e);
          } finally {
            o.injectImpl && ct(c), Ye(a), (o.resolving = !1), xe();
          }
        }
        return s;
      }
      function ln(t, e, n) {
        const r = 64 & t,
          s = 32 & t;
        let i;
        return (
          (i =
            128 & t
              ? r
                ? s
                  ? n[e + 7]
                  : n[e + 6]
                : s
                ? n[e + 5]
                : n[e + 4]
              : r
              ? s
                ? n[e + 3]
                : n[e + 2]
              : s
              ? n[e + 1]
              : n[e]),
          !!(i & (1 << t))
        );
      }
      function hn(t, e) {
        return !(t & S.Self || (t & S.Host && e));
      }
      class dn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return sn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function fn(t) {
        return b(() => {
          const e = Object.getPrototypeOf(t.prototype).constructor,
            n =
              e[K] ||
              (function t(e) {
                const n = e;
                if (F(e))
                  return () => {
                    const e = t(V(n));
                    return e ? e() : null;
                  };
                let r = Dt(n);
                if (null === r) {
                  const t = A(n);
                  r = t && t.factory;
                }
                return r || null;
              })(e);
          return null !== n ? n : (t) => new t();
        });
      }
      function pn(t) {
        return t.ngDebugContext;
      }
      function gn(t) {
        return t.ngOriginalError;
      }
      function mn(t, ...e) {
        t.error(...e);
      }
      class bn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t.ngErrorLogger || mn;
            })(t);
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (pn(t) ? pn(t) : this._findContext(gn(t))) : null;
        }
        _findOriginalError(t) {
          let e = gn(t);
          for (; e && gn(e); ) e = gn(e);
          return e;
        }
      }
      class yn {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      class vn extends yn {
        getTypeName() {
          return "HTML";
        }
      }
      class wn extends yn {
        getTypeName() {
          return "Style";
        }
      }
      class _n extends yn {
        getTypeName() {
          return "Script";
        }
      }
      class Cn extends yn {
        getTypeName() {
          return "URL";
        }
      }
      class Sn extends yn {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function xn(t) {
        return t instanceof yn ? t.changingThisBreaksApplicationSecurity : t;
      }
      function On(t, e) {
        const n = En(t);
        if (null != n && n !== e) {
          if ("ResourceURL" === n && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${n} (see http://g.co/ng/security#xss)`
          );
        }
        return n === e;
      }
      function En(t) {
        return (t instanceof yn && t.getTypeName()) || null;
      }
      function Tn(t) {
        return new vn(t);
      }
      function jn(t) {
        return new wn(t);
      }
      function In(t) {
        return new _n(t);
      }
      function An(t) {
        return new Cn(t);
      }
      function kn(t) {
        return new Sn(t);
      }
      let Rn = !0,
        Nn = !1;
      function Pn() {
        return (Nn = !0), Rn;
      }
      function Dn() {
        if (Nn)
          throw new Error("Cannot enable prod mode after platform setup.");
        Rn = !1;
      }
      class Un {
        constructor(t) {
          (this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
              "sanitization-inert"
            ));
          let e = this.inertDocument.body;
          if (null == e) {
            const t = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(t),
              (e = this.inertDocument.createElement("body")),
              t.appendChild(e);
          }
          (e.innerHTML =
            '<svg><g onload="this.parentNode.remove()"></g></svg>'),
            !e.querySelector || e.querySelector("svg")
              ? ((e.innerHTML =
                  '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                (this.getInertBodyElement =
                  e.querySelector &&
                  e.querySelector("svg img") &&
                  (function () {
                    try {
                      return !!window.DOMParser;
                    } catch (t) {
                      return !1;
                    }
                  })()
                    ? this.getInertBodyElement_DOMParser
                    : this.getInertBodyElement_InertDocument))
              : (this.getInertBodyElement = this.getInertBodyElement_XHR);
        }
        getInertBodyElement_XHR(t) {
          t = "<body><remove></remove>" + t + "</body>";
          try {
            t = encodeURI(t);
          } catch (r) {
            return null;
          }
          const e = new XMLHttpRequest();
          (e.responseType = "document"),
            e.open("GET", "data:text/html;charset=utf-8," + t, !1),
            e.send(void 0);
          const n = e.response.body;
          return n.removeChild(n.firstChild), n;
        }
        getInertBodyElement_DOMParser(t) {
          t = "<body><remove></remove>" + t + "</body>";
          try {
            const e = new window.DOMParser().parseFromString(t, "text/html")
              .body;
            return e.removeChild(e.firstChild), e;
          } catch (e) {
            return null;
          }
        }
        getInertBodyElement_InertDocument(t) {
          const e = this.inertDocument.createElement("template");
          if ("content" in e) return (e.innerHTML = t), e;
          const n = this.inertDocument.createElement("body");
          return (
            (n.innerHTML = t),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(n),
            n
          );
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let r = e.length - 1; 0 < r; r--) {
            const n = e.item(r).name;
            ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
              t.removeAttribute(n);
          }
          let n = t.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const Ln = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Mn = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Hn(t) {
        return (t = String(t)).match(Ln) || t.match(Mn)
          ? t
          : (Pn() &&
              console.warn(
                `WARNING: sanitizing unsafe URL value ${t} (see http://g.co/ng/security#xss)`
              ),
            "unsafe:" + t);
      }
      function Vn(t) {
        const e = {};
        for (const n of t.split(",")) e[n] = !0;
        return e;
      }
      function Fn(...t) {
        const e = {};
        for (const n of t)
          for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
        return e;
      }
      const $n = Vn("area,br,col,hr,img,wbr"),
        zn = Vn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        qn = Vn("rp,rt"),
        Bn = Fn(qn, zn),
        Zn = Fn(
          $n,
          Fn(
            zn,
            Vn(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Fn(
            qn,
            Vn(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Bn
        ),
        Wn = Vn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Gn = Vn("srcset"),
        Qn = Fn(
          Wn,
          Gn,
          Vn(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          Vn(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        Jn = Vn("script,style,template");
      class Yn {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            n = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              n && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let t = this.checkClobberedElement(e, e.nextSibling);
                if (t) {
                  e = t;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!Zn.hasOwnProperty(e))
            return (this.sanitizedSomething = !0), !Jn.hasOwnProperty(e);
          this.buf.push("<"), this.buf.push(e);
          const n = t.attributes;
          for (let s = 0; s < n.length; s++) {
            const t = n.item(s),
              e = t.name,
              i = e.toLowerCase();
            if (!Qn.hasOwnProperty(i)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = t.value;
            Wn[i] && (o = Hn(o)),
              Gn[i] &&
                ((r = o),
                (o = (r = String(r))
                  .split(",")
                  .map((t) => Hn(t.trim()))
                  .join(", "))),
              this.buf.push(" ", e, '="', tr(o), '"');
          }
          var r;
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          Zn.hasOwnProperty(e) &&
            !$n.hasOwnProperty(e) &&
            (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(tr(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return e;
        }
      }
      const Kn = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Xn = /([^\#-~ |!])/g;
      function tr(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(Kn, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(Xn, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let er;
      function nr(t, e) {
        let n = null;
        try {
          er = er || new Un(t);
          let r = e ? String(e) : "";
          n = er.getInertBodyElement(r);
          let s = 5,
            i = r;
          do {
            if (0 === s)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            s--, (r = i), (i = n.innerHTML), (n = er.getInertBodyElement(r));
          } while (r !== i);
          const o = new Yn(),
            a = o.sanitizeChildren(rr(n) || n);
          return (
            Pn() &&
              o.sanitizedSomething &&
              console.warn(
                "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
              ),
            a
          );
        } finally {
          if (n) {
            const t = rr(n) || n;
            for (; t.firstChild; ) t.removeChild(t.firstChild);
          }
        }
      }
      function rr(t) {
        return "content" in t &&
          (function (t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      const sr = (function () {
          var t = {
            NONE: 0,
            HTML: 1,
            STYLE: 2,
            SCRIPT: 3,
            URL: 4,
            RESOURCE_URL: 5,
          };
          return (
            (t[t.NONE] = "NONE"),
            (t[t.HTML] = "HTML"),
            (t[t.STYLE] = "STYLE"),
            (t[t.SCRIPT] = "SCRIPT"),
            (t[t.URL] = "URL"),
            (t[t.RESOURCE_URL] = "RESOURCE_URL"),
            t
          );
        })(),
        ir = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:attr|calc|var))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        or = /^url\(([^)]+)\)$/;
      function ar(t) {
        if (!(t = String(t).trim())) return "";
        const e = t.match(or);
        return (e && Hn(e[1]) === e[1]) ||
          (t.match(ir) &&
            (function (t) {
              let e = !0,
                n = !0;
              for (let r = 0; r < t.length; r++) {
                const s = t.charAt(r);
                "'" === s && n ? (e = !e) : '"' === s && e && (n = !n);
              }
              return e && n;
            })(t))
          ? t
          : (Pn() &&
              console.warn(
                `WARNING: sanitizing unsafe style value ${t} (see http://g.co/ng/security#xss).`
              ),
            "unsafe");
      }
      function cr(t) {
        const e = (function () {
          const t = oe();
          return t && t[12];
        })();
        return e
          ? e.sanitize(sr.URL, t) || ""
          : On(t, "URL")
          ? xn(t)
          : Hn(Be(t));
      }
      function ur(t, e) {
        t.__ngContext__ = e;
      }
      function lr(t) {
        throw new Error(
          `Multiple components match node with tagname ${t.tagName}`
        );
      }
      function hr() {
        throw new Error("Cannot mix multi providers and regular providers");
      }
      function dr(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      function fr(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && "class" === s) {
            if (((s = t[r]), -1 !== dr(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function pr(t) {
        return 0 === t.type && "ng-template" !== t.tagName;
      }
      function gr(t, e, n) {
        return e === (0 !== t.type || n ? t.tagName : "ng-template");
      }
      function mr(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (Le(t[e])) return e;
            return t.length;
          })(s);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const c = e[a];
          if ("number" != typeof c) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== c && !gr(t, c, n)) || ("" === c && 1 === e.length))
                ) {
                  if (br(r)) return !1;
                  o = !0;
                }
              } else {
                const u = 8 & r ? c : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!fr(t.attrs, u, n)) {
                    if (br(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const l = yr(8 & r ? "class" : c, s, pr(t), n);
                if (-1 === l) {
                  if (br(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== u) {
                  let t;
                  t = l > i ? "" : s[l + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== dr(e, u, 0)) || (2 & r && u !== t)) {
                    if (br(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !br(r) && !br(c)) return !1;
            if (o && br(c)) continue;
            (o = !1), (r = c | (1 & r));
          }
        }
        return br(r) || o;
      }
      function br(t) {
        return 0 == (1 & t);
      }
      function yr(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++s];
                for (; "string" == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function vr(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (mr(t, e[r], n)) return !0;
        return !1;
      }
      function wr(t, e) {
        t: for (let n = 0; n < e.length; n++) {
          const r = e[n];
          if (t.length === r.length) {
            for (let e = 0; e < t.length; e++) if (t[e] !== r[e]) continue t;
            return !0;
          }
        }
        return !1;
      }
      function _r(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function Cr(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = "",
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & r) {
              const e = t[++n];
              s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & r ? (s += "." + o) : 4 & r && (s += " " + o);
          else
            "" === s || br(o) || ((e += _r(i, s)), (s = "")),
              (r = o),
              (i = i || !br(r));
          n++;
        }
        return "" !== s && (e += _r(i, s)), e;
      }
      const Sr = {};
      function xr(t) {
        const e = t[3];
        return Mt(e) ? e[3] : e;
      }
      function Or(t) {
        Er(ae(), oe(), Ee() + t, de());
      }
      function Er(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && Ae(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && ke(e, r, 0, n);
          }
        Te(n);
      }
      function Tr(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const n = t.data[i];
              ye(s), n.contentQueries(2, e[i], i);
            }
          }
      }
      function jr(t, e, n) {
        return Zt(e)
          ? e.createElement(t, n)
          : null === n
          ? e.createElement(t)
          : e.createElementNS(n, t);
      }
      function Ir(t, e, n, r, s, i, o, a, c, u) {
        const l = e.blueprint.slice();
        return (
          (l[0] = s),
          (l[2] = 140 | r),
          ne(l),
          (l[3] = l[15] = t),
          (l[8] = n),
          (l[10] = o || (t && t[10])),
          (l[11] = a || (t && t[11])),
          (l[12] = c || (t && t[12]) || null),
          (l[9] = u || (t && t[9]) || null),
          (l[6] = i),
          (l[16] = 2 == e.type ? t[16] : l),
          l
        );
      }
      function Ar(t, e, n, r, s, i) {
        const o = n + 20,
          a =
            t.data[o] ||
            (function (t, e, n, r, s, i) {
              const o = ce(),
                a = le(),
                c = a ? o : o && o.parent,
                u = (t.data[n] = Hr(0, c && c !== e ? c : null, r, n, s, i));
              return (
                null === t.firstChild && (t.firstChild = u),
                o &&
                  (!a || null != o.child || (null === u.parent && 2 !== o.type)
                    ? a || (o.next = u)
                    : (o.child = u)),
                u
              );
            })(t, e, o, r, s, i);
        return ue(a, !0), a;
      }
      function kr(t, e, n) {
        we(e, e[6]);
        try {
          const r = t.viewQuery;
          null !== r && us(1, r, n);
          const s = t.template;
          null !== s && Pr(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Tr(t, e),
            t.staticViewQueries && us(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) ss(t, e[n]);
            })(e, i);
        } catch (r) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), r);
        } finally {
          (e[2] &= -5), Oe();
        }
      }
      function Rr(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        we(e, e[6]);
        const i = de();
        try {
          ne(e),
            (se.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && Pr(t, e, n, 2, r);
          const o = 3 == (3 & s);
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && Ae(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && ke(e, n, 0, null), Re(e, 0);
            }
          if (
            ((function (t) {
              for (let e = es(t); null !== e; e = ns(e))
                if (0 != (1 & e[2])) {
                  const t = e[9];
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e],
                      r = n[3];
                    0 == (1024 & n[2]) && re(r, 1), (n[2] |= 1024);
                  }
                }
            })(e),
            (function (t) {
              for (let e = es(t); null !== e; e = ns(e))
                for (let t = 10; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  te(n) && Rr(r, n, r.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && Tr(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && Ae(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && ke(e, n, 1), Re(e, 1);
            }
          !(function (t, e) {
            try {
              const n = t.expandoInstructions;
              if (null !== n) {
                let r = t.expandoStartIndex,
                  s = -1,
                  i = -1;
                for (let t = 0; t < n.length; t++) {
                  const o = n[t];
                  "number" == typeof o
                    ? o <= 0
                      ? ((i = 0 - o), Te(i), (r += 9 + n[++t]), (s = r))
                      : (r += o)
                    : (null !== o && (ge(r, s), o(2, e[s])), s++);
                }
              }
            } finally {
              Te(-1);
            }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) rs(t, e[n]);
            })(e, a);
          const c = t.viewQuery;
          if ((null !== c && us(2, c, r), !i))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && Ae(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && ke(e, n, 2), Re(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), re(e[3], -1));
        } finally {
          Oe();
        }
      }
      function Nr(t, e, n, r) {
        const s = e[10],
          i = !de(),
          o = Xt(e);
        try {
          i && !o && s.begin && s.begin(), o && kr(t, e, r), Rr(t, e, n, r);
        } finally {
          i && !o && s.end && s.end();
        }
      }
      function Pr(t, e, n, r, s) {
        const i = Ee();
        try {
          Te(-1), 2 & r && e.length > 20 && Er(t, e, 0, de()), n(r, s);
        } finally {
          Te(i);
        }
      }
      function Dr(t, e, n) {
        ie() &&
          ((function (t, e, n, r) {
            const s = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || Xe(n, e), ur(r, e);
            const o = n.initialInputs;
            for (let a = s; a < i; a++) {
              const r = t.data[a],
                i = $t(r);
              i && Yr(e, n, r);
              const c = un(e, t, a, n);
              ur(c, e),
                null !== o && Kr(0, a - s, c, r, 0, o),
                i && (Yt(n.index, e)[8] = c);
            }
          })(t, e, n, Qt(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                i = t.expandoInstructions,
                o = t.firstCreatePass,
                a = n.index - 20,
                c = se.lFrame.currentDirectiveIndex;
              try {
                Te(a);
                for (let n = r; n < s; n++) {
                  const r = t.data[n],
                    s = e[n];
                  me(n),
                    null !== r.hostBindings ||
                    0 !== r.hostVars ||
                    null !== r.hostAttrs
                      ? Br(r, s)
                      : o && i.push(null);
                }
              } finally {
                Te(-1), me(c);
              }
            })(t, e, n));
      }
      function Ur(t, e, n = Qt) {
        const r = e.localNames;
        if (null !== r) {
          let s = e.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[s++] = a;
          }
        }
      }
      function Lr(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Mr(
              1,
              -1,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function Mr(t, e, n, r, s, i, o, a, c, u) {
        const l = 20 + r,
          h = l + s,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : Sr);
            return n;
          })(l, h);
        return (d[1] = {
          type: t,
          id: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          node: null,
          data: d.slice().fill(null, l),
          bindingStartIndex: l,
          expandoStartIndex: h,
          expandoInstructions: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: c,
          consts: u,
          incompleteFirstPass: !1,
        });
      }
      function Hr(t, e, n, r, s, i) {
        return {
          type: n,
          index: r,
          injectorIndex: e ? e.injectorIndex : -1,
          directiveStart: -1,
          directiveEnd: -1,
          directiveStylingLast: -1,
          propertyBindings: null,
          flags: 0,
          providerIndexes: 0,
          tagName: s,
          attrs: i,
          mergedAttrs: null,
          localNames: null,
          initialInputs: void 0,
          inputs: null,
          outputs: null,
          tViews: null,
          next: null,
          projectionNext: null,
          child: null,
          parent: e,
          projection: null,
          styles: null,
          residualStyles: void 0,
          classes: null,
          residualClasses: void 0,
          classBindings: 0,
          styleBindings: 0,
        };
      }
      function Vr(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, s)
              : (n[r] = [e, s]);
          }
        return n;
      }
      function Fr(t, e, n, r, s, i, o, a) {
        const c = Qt(e, n);
        let u,
          l = e.inputs;
        var h;
        !a && null != l && (u = l[r])
          ? (ps(t, n, u, r, s),
            Vt(e) &&
              (function (t, e) {
                const n = Yt(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 === e.type &&
            ((r =
              "class" === (h = r)
                ? "className"
                : "for" === h
                ? "htmlFor"
                : "formaction" === h
                ? "formAction"
                : "innerHtml" === h
                ? "innerHTML"
                : "readonly" === h
                ? "readOnly"
                : "tabindex" === h
                ? "tabIndex"
                : h),
            (s = null != o ? o(s, e.tagName || "", r) : s),
            Zt(i)
              ? i.setProperty(c, r, s)
              : Me(r) || (c.setProperty ? c.setProperty(r, s) : (c[r] = s)));
      }
      function $r(t, e, n, r) {
        let s = !1;
        if (ie()) {
          const i = (function (t, e, n) {
              const r = t.directiveRegistry;
              let s = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i];
                  vr(n, o.selectors, !1) &&
                    (s || (s = []),
                    rn(Xe(n, e), t, o.type),
                    $t(o)
                      ? (2 & n.flags && lr(n), Wr(t, n), s.unshift(o))
                      : s.push(o));
                }
              return s;
            })(t, e, n),
            o = null === r ? null : { "": -1 };
          if (null !== i) {
            let r = 0;
            (s = !0), Qr(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              e.providersResolver && e.providersResolver(e);
            }
            Zr(t, n, i.length);
            let a = !1,
              c = !1;
            for (let s = 0; s < i.length; s++) {
              const u = i[s];
              (n.mergedAttrs = He(n.mergedAttrs, u.hostAttrs)),
                Jr(t, e, u),
                Gr(t.data.length - 1, u, o),
                null !== u.contentQueries && (n.flags |= 8),
                (null === u.hostBindings &&
                  null === u.hostAttrs &&
                  0 === u.hostVars) ||
                  (n.flags |= 128),
                !a &&
                  (u.onChanges || u.onInit || u.doCheck) &&
                  ((t.preOrderHooks || (t.preOrderHooks = [])).push(
                    n.index - 20
                  ),
                  (a = !0)),
                c ||
                  (!u.onChanges && !u.doCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index - 20
                  ),
                  (c = !0)),
                zr(t, u),
                (r += u.hostVars);
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                s = e.attrs,
                i = [];
              let o = null,
                a = null;
              for (let c = e.directiveStart; c < n; c++) {
                const t = r[c],
                  n = t.inputs,
                  u = null === s || pr(e) ? null : Xr(n, s);
                i.push(u), (o = Vr(n, c, o)), (a = Vr(t.outputs, c, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (e.flags |= 16),
                o.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n),
              qr(t, e, r);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]];
                  if (null == s)
                    throw new Error(`Export of name '${e[t + 1]}' not found!`);
                  r.push(e[t], s);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = He(n.mergedAttrs, n.attrs)), s;
      }
      function zr(t, e) {
        const n = t.expandoInstructions;
        n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
      }
      function qr(t, e, n) {
        for (let r = 0; r < n; r++)
          e.push(Sr), t.blueprint.push(Sr), t.data.push(null);
      }
      function Br(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function Zr(t, e, n) {
        const r = 20 - e.index,
          s = t.data.length - (65535 & e.providerIndexes);
        (t.expandoInstructions || (t.expandoInstructions = [])).push(r, s, n);
      }
      function Wr(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function Gr(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          $t(e) && (n[""] = t);
        }
      }
      function Qr(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function Jr(t, e, n) {
        t.data.push(n);
        const r = n.factory || (n.factory = Dt(n.type)),
          s = new De(r, $t(n), null);
        t.blueprint.push(s), e.push(s);
      }
      function Yr(t, e, n) {
        const r = Qt(e, t),
          s = Lr(n),
          i = t[10],
          o = is(
            t,
            Ir(t, s, null, n.onPush ? 64 : 16, r, e, i, i.createRenderer(r, n))
          );
        t[e.index] = o;
      }
      function Kr(t, e, n, r, s, i) {
        const o = i[e];
        if (null !== o) {
          const t = r.setInput;
          for (let e = 0; e < o.length; ) {
            const s = o[e++],
              i = o[e++],
              a = o[e++];
            null !== t ? r.setInput(n, a, s, i) : (n[i] = a);
          }
        }
      }
      function Xr(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function ts(t, e, n, r) {
        return new Array(t, !0, -2, e, null, 0, r, n, null, null);
      }
      function es(t) {
        let e = t[13];
        for (; null !== e && (!Mt(e) || e[2] >> 1 != -1); ) e = e[4];
        return e;
      }
      function ns(t) {
        let e = t[4];
        for (; null !== e && (!Mt(e) || e[2] >> 1 != -1); ) e = e[4];
        return e;
      }
      function rs(t, e) {
        const n = Yt(e, t);
        if (te(n)) {
          const t = n[1];
          80 & n[2]
            ? Rr(t, n, t.template, n[8])
            : n[5] > 0 &&
              (function t(e) {
                for (let r = es(e); null !== r; r = ns(r))
                  for (let e = 10; e < r.length; e++) {
                    const n = r[e];
                    if (1024 & n[2]) {
                      const t = n[1];
                      Rr(t, n, t.template, n[8]);
                    } else n[5] > 0 && t(n);
                  }
                const n = e[1].components;
                if (null !== n)
                  for (let r = 0; r < n.length; r++) {
                    const s = Yt(n[r], e);
                    te(s) && s[5] > 0 && t(s);
                  }
              })(n);
        }
      }
      function ss(t, e) {
        const n = Yt(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          kr(r, n, n[8]);
      }
      function is(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function os(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = xr(t);
          if (zt(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function as(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          Rr(t, e, t.template, n);
        } catch (s) {
          throw (fs(e, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function cs(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = Kt(n),
              s = r[1];
            Nr(s, r, s.template, n);
          }
        })(t[8]);
      }
      function us(t, e, n) {
        ye(0), e(t, n);
      }
      const ls = (() => Promise.resolve(null))();
      function hs(t) {
        return t[7] || (t[7] = []);
      }
      function ds(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function fs(t, e) {
        const n = t[9],
          r = n ? n.get(bn, null) : null;
        r && r.handleError(e);
      }
      function ps(t, e, n, r, s) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            c = e[o],
            u = t.data[o];
          null !== u.setInput ? u.setInput(c, s, r, a) : (c[a] = s);
        }
      }
      function gs(t, e) {
        const n = e[3];
        return -1 === t.index ? (Mt(n) ? n : null) : n;
      }
      function ms(t, e) {
        const n = gs(t, e);
        return n ? js(e[11], n[7]) : null;
      }
      function bs(t, e, n, r, s) {
        if (null != r) {
          let i,
            o = !1;
          Mt(r) ? (i = r) : Lt(r) && ((o = !0), (r = r[0]));
          const a = Gt(r);
          0 === t && null !== n
            ? null == s
              ? Es(e, n, a)
              : Os(e, n, a, s || null)
            : 1 === t && null !== n
            ? Os(e, n, a, s || null)
            : 2 === t
            ? (function (t, e, n) {
                const r = js(t, e);
                r &&
                  (function (t, e, n, r) {
                    Zt(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, r, s) {
                const i = n[7];
                i !== Gt(n) && bs(e, t, r, i, s);
                for (let o = 10; o < n.length; o++) {
                  const s = n[o];
                  Ns(s[1], s, t, e, r, i);
                }
              })(e, t, i, n, s);
        }
      }
      function ys(t, e, n, r) {
        const s = ms(t.node, e);
        s && Ns(t, e, e[11], n ? 1 : 2, s, r);
      }
      function vs(t, e) {
        const n = t[9],
          r = n.indexOf(e);
        1024 & e[2] && re(e[3], -1), n.splice(r, 1);
      }
      function ws(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          r = t[n];
        if (r) {
          const s = r[17];
          null !== s && s !== t && vs(s, r), e > 0 && (t[n - 1][4] = r[4]);
          const i = yt(t, 10 + e);
          ys(r[1], r, !1, null);
          const o = i[19];
          null !== o && o.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function _s(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          Zt(n) && n.destroyNode && Ns(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return Ss(t[1], t);
              for (; e; ) {
                let n = null;
                if (Lt(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    Lt(e) && Ss(e[1], e), (e = Cs(e, t));
                  null === e && (e = t), Lt(e) && Ss(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function Cs(t, e) {
        let n;
        return Lt(t) && (n = t[6]) && 2 === n.type
          ? gs(n, t)
          : t[3] === e
          ? null
          : t[3];
      }
      function Ss(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof De)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup;
              if (null !== n) {
                const t = e[7];
                for (let r = 0; r < n.length - 1; r += 2)
                  if ("string" == typeof n[r]) {
                    const s = n[r + 1],
                      i = "function" == typeof s ? s(e) : Gt(e[s]),
                      o = t[n[r + 2]],
                      a = n[r + 3];
                    "boolean" == typeof a
                      ? i.removeEventListener(n[r], o, a)
                      : a >= 0
                      ? t[a]()
                      : t[-a].unsubscribe(),
                      (r += 2);
                  } else n[r].call(t[n[r + 1]]);
                e[7] = null;
              }
            })(t, e);
          const n = e[6];
          n && 3 === n.type && Zt(e[11]) && e[11].destroy();
          const r = e[17];
          if (null !== r && Mt(e[3])) {
            r !== e[3] && vs(r, e);
            const n = e[19];
            null !== n && n.detachView(t);
          }
        }
      }
      function xs(t, e, n) {
        let r = e.parent;
        for (; null != r && (4 === r.type || 5 === r.type); )
          r = (e = r).parent;
        if (null == r) {
          const t = n[6];
          return 2 === t.type ? ms(t, n) : n[0];
        }
        if (e && 5 === e.type && 4 & e.flags) return Qt(e, n).parentNode;
        if (2 & r.flags) {
          const e = t.data,
            n = e[e[r.index].directiveStart].encapsulation;
          if (n !== _t.ShadowDom && n !== _t.Native) return null;
        }
        return Qt(r, n);
      }
      function Os(t, e, n, r) {
        Zt(t) ? t.insertBefore(e, n, r) : e.insertBefore(n, r, !0);
      }
      function Es(t, e, n) {
        Zt(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function Ts(t, e, n, r) {
        null !== r ? Os(t, e, n, r) : Es(t, e, n);
      }
      function js(t, e) {
        return Zt(t) ? t.parentNode(e) : e.parentNode;
      }
      function Is(t, e) {
        if (2 === t.type) {
          const n = gs(t, e);
          return null === n ? null : ks(n.indexOf(e, 10) - 10, n);
        }
        return 4 === t.type || 5 === t.type ? Qt(t, e) : null;
      }
      function As(t, e, n, r) {
        const s = xs(t, r, e);
        if (null != s) {
          const t = e[11],
            i = Is(r.parent || e[6], e);
          if (Array.isArray(n))
            for (let e = 0; e < n.length; e++) Ts(t, s, n[e], i);
          else Ts(t, s, n, i);
        }
      }
      function ks(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r)
            return (function t(e, n) {
              if (null !== n) {
                const r = n.type;
                if (3 === r) return Qt(n, e);
                if (0 === r) return ks(-1, e[n.index]);
                if (4 === r || 5 === r) {
                  const r = n.child;
                  if (null !== r) return t(e, r);
                  {
                    const t = e[n.index];
                    return Mt(t) ? ks(-1, t) : Gt(t);
                  }
                }
                {
                  const r = e[16],
                    s = r[6],
                    i = xr(r),
                    o = s.projection[n.projection];
                  return null != o ? t(i, o) : t(e, n.next);
                }
              }
              return null;
            })(t, r);
        }
        return e[7];
      }
      function Rs(t, e, n, r, s, i, o) {
        for (; null != n; ) {
          const a = r[n.index],
            c = n.type;
          o && 0 === e && (a && ur(Gt(a), r), (n.flags |= 4)),
            64 != (64 & n.flags) &&
              (4 === c || 5 === c
                ? (Rs(t, e, n.child, r, s, i, !1), bs(e, t, s, a, i))
                : 1 === c
                ? Ps(t, e, r, n, s, i)
                : bs(e, t, s, a, i)),
            (n = o ? n.projectionNext : n.next);
        }
      }
      function Ns(t, e, n, r, s, i) {
        Rs(n, r, t.node.child, e, s, i, !1);
      }
      function Ps(t, e, n, r, s, i) {
        const o = n[16],
          a = o[6].projection[r.projection];
        if (Array.isArray(a))
          for (let c = 0; c < a.length; c++) bs(e, t, s, a[c], i);
        else Rs(t, e, a, o[3], s, i, !0);
      }
      function Ds(t, e, n) {
        Zt(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Us(t, e, n) {
        Zt(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      class Ls {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._viewContainerRef = null),
            (this._tViewNode = null);
        }
        get rootNodes() {
          const t = this._lView;
          return null == t[0]
            ? (function t(e, n, r, s, i = !1) {
                for (; null !== r; ) {
                  const o = n[r.index];
                  if ((null !== o && s.push(Gt(o)), Mt(o)))
                    for (let e = 10; e < o.length; e++) {
                      const n = o[e],
                        r = n[1].firstChild;
                      null !== r && t(n[1], n, r, s);
                    }
                  const a = r.type;
                  if (4 === a || 5 === a) t(e, n, r.child, s);
                  else if (1 === a) {
                    const e = n[16],
                      i = e[6].projection[r.projection];
                    if (Array.isArray(i)) s.push(...i);
                    else {
                      const n = xr(e);
                      t(n[1], n, i, s, !0);
                    }
                  }
                  r = i ? r.projectionNext : r.next;
                }
                return s;
              })(t[1], t, t[6].child, [])
            : [];
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const t = this._viewContainerRef.indexOf(this);
            t > -1 && this._viewContainerRef.detach(t),
              (this._viewContainerRef = null);
          }
          _s(this._lView[1], this._lView);
        }
        onDestroy(t) {
          var e, n, r;
          (e = this._lView[1]),
            (r = t),
            hs((n = this._lView)).push(r),
            e.firstCreatePass && ds(e).push(n[7].length - 1, null);
        }
        markForCheck() {
          os(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          as(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            fe(!0);
            try {
              as(t, e, n);
            } finally {
              fe(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            Ns(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class Ms extends Ls {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          cs(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            fe(!0);
            try {
              cs(t);
            } finally {
              fe(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      let Hs, Vs, Fs;
      function $s(t, e, n) {
        return Hs || (Hs = class extends t {}), new Hs(Qt(e, n));
      }
      function zs(t, e, n, r) {
        return (
          Vs ||
            (Vs = class extends t {
              constructor(t, e, n) {
                super(),
                  (this._declarationView = t),
                  (this._declarationTContainer = e),
                  (this.elementRef = n);
              }
              createEmbeddedView(t) {
                const e = this._declarationTContainer.tViews,
                  n = Ir(this._declarationView, e, t, 16, null, e.node);
                n[17] = this._declarationView[
                  this._declarationTContainer.index
                ];
                const r = this._declarationView[19];
                null !== r && (n[19] = r.createEmbeddedView(e)), kr(e, n, t);
                const s = new Ls(n);
                return (s._tViewNode = n[6]), s;
              }
            }),
          0 === n.type ? new Vs(r, n, $s(e, n, r)) : null
        );
      }
      function qs(t, e, n, r) {
        let s;
        Fs ||
          (Fs = class extends t {
            constructor(t, e, n) {
              super(),
                (this._lContainer = t),
                (this._hostTNode = e),
                (this._hostView = n);
            }
            get element() {
              return $s(e, this._hostTNode, this._hostView);
            }
            get injector() {
              return new dn(this._hostTNode, this._hostView);
            }
            get parentInjector() {
              const t = nn(this._hostTNode, this._hostView),
                e = qe(t, this._hostView),
                n = (function (t, e, n) {
                  if (n.parent && -1 !== n.parent.injectorIndex) {
                    const t = n.parent.injectorIndex;
                    let e = n.parent;
                    for (; null != e.parent && t == e.parent.injectorIndex; )
                      e = e.parent;
                    return e;
                  }
                  let r = ze(t),
                    s = e,
                    i = e[6];
                  for (; r > 1; ) (s = s[15]), (i = s[6]), r--;
                  return i;
                })(t, this._hostView, this._hostTNode);
              return Fe(t) && null != n
                ? new dn(n, e)
                : new dn(null, this._hostView);
            }
            clear() {
              for (; this.length > 0; ) this.remove(this.length - 1);
            }
            get(t) {
              return (
                (null !== this._lContainer[8] && this._lContainer[8][t]) || null
              );
            }
            get length() {
              return this._lContainer.length - 10;
            }
            createEmbeddedView(t, e, n) {
              const r = t.createEmbeddedView(e || {});
              return this.insert(r, n), r;
            }
            createComponent(t, e, n, r, s) {
              const i = n || this.parentInjector;
              if (!s && null == t.ngModule && i) {
                const t = i.get(pt, null);
                t && (s = t);
              }
              const o = t.create(i, r, void 0, s);
              return this.insert(o.hostView, e), o;
            }
            insert(t, e) {
              const n = t._lView,
                r = n[1];
              if (t.destroyed)
                throw new Error(
                  "Cannot insert a destroyed View in a ViewContainer!"
                );
              if ((this.allocateContainerIfNeeded(), Mt(n[3]))) {
                const e = this.indexOf(t);
                if (-1 !== e) this.detach(e);
                else {
                  const e = n[3],
                    r = new Fs(e, e[6], e[3]);
                  r.detach(r.indexOf(t));
                }
              }
              const s = this._adjustIndex(e);
              return (
                (function (t, e, n, r) {
                  const s = 10 + r,
                    i = n.length;
                  r > 0 && (n[s - 1][4] = e),
                    r < i - 10
                      ? ((e[4] = n[s]), bt(n, 10 + r, e))
                      : (n.push(e), (e[4] = null)),
                    (e[3] = n);
                  const o = e[17];
                  null !== o &&
                    n !== o &&
                    (function (t, e) {
                      const n = t[9];
                      e[16] !== e[3][3][16] && (t[2] |= 1),
                        null === n ? (t[9] = [e]) : n.push(e);
                    })(o, e);
                  const a = e[19];
                  null !== a && a.insertView(t), (e[2] |= 128);
                })(r, n, this._lContainer, s),
                ys(r, n, !0, ks(s, this._lContainer)),
                t.attachToViewContainerRef(this),
                bt(this._lContainer[8], s, t),
                t
              );
            }
            move(t, e) {
              if (t.destroyed)
                throw new Error(
                  "Cannot move a destroyed View in a ViewContainer!"
                );
              return this.insert(t, e);
            }
            indexOf(t) {
              const e = this._lContainer[8];
              return null !== e ? e.indexOf(t) : -1;
            }
            remove(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1);
              !(function (t, e) {
                const n = ws(t, e);
                n && _s(n[1], n);
              })(this._lContainer, e),
                yt(this._lContainer[8], e);
            }
            detach(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1),
                n = ws(this._lContainer, e);
              return n && null != yt(this._lContainer[8], e) ? new Ls(n) : null;
            }
            _adjustIndex(t, e = 0) {
              return null == t ? this.length + e : t;
            }
            allocateContainerIfNeeded() {
              null === this._lContainer[8] && (this._lContainer[8] = []);
            }
          });
        const i = r[n.index];
        if (Mt(i))
          (s = i),
            (function (t, e) {
              t[2] = -2;
            })(s);
        else {
          let t;
          if (4 === n.type) t = Gt(i);
          else if (((t = r[11].createComment("")), zt(r))) {
            const e = r[11],
              s = Qt(n, r);
            Os(
              e,
              js(e, s),
              t,
              (function (t, e) {
                return Zt(t) ? t.nextSibling(e) : e.nextSibling;
              })(e, s)
            );
          } else As(r[1], r, t, n);
          (r[n.index] = s = ts(i, r, t, n)), is(r, s);
        }
        return new Fs(s, n, r);
      }
      function Bs(t = !1) {
        return (function (t, e, n) {
          if (!n && Vt(t)) {
            const n = Yt(t.index, e);
            return new Ls(n, n);
          }
          return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type
            ? new Ls(e[16], e)
            : null;
        })(ce(), oe(), t);
      }
      let Zs = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Ws()), t;
      })();
      const Ws = Bs,
        Gs = new tt("Set Injector scope."),
        Qs = {},
        Js = {},
        Ys = [];
      let Ks = void 0;
      function Xs() {
        return void 0 === Ks && (Ks = new ft()), Ks;
      }
      function ti(t, e = null, n = null, r) {
        return new ei(t, n, e || Xs(), r);
      }
      class ei {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && mt(e, (n) => this.processProvider(n, t, e)),
            mt([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(et, si(void 0, this));
          const i = this.records.get(Gs);
          (this.scope = null != i ? i.value : null),
            (this.source = r || ("object" == typeof t ? null : U(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = nt, n = S.Default) {
          this.assertNotDestroyed();
          const r = at(this);
          try {
            if (!(n & S.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (s = t) ||
                    ("object" == typeof s && s instanceof tt)) &&
                  j(t);
                (e = n && this.injectableDefInScope(n) ? si(ni(t), Qs) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & S.Self ? Xs() : this.parent).get(
              t,
              (e = n & S.Optional && e === nt ? null : e)
            );
          } catch (i) {
            if ("NullInjectorError" === i.name) {
              if (
                ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(U(t)), r)
              )
                throw i;
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath;
                throw (
                  (e.__source && s.unshift(e.__source),
                  (t.message = (function (t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let s = U(e);
                    if (Array.isArray(e)) s = e.map(U).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof r ? JSON.stringify(r) : U(r))
                          );
                        }
                      s = `{${t.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(
                      rt,
                      "\n  "
                    )}`;
                  })("\n" + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(i, t, "R3InjectorError", this.source);
            }
            throw i;
          } finally {
            at(r);
          }
          var s;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(U(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = V(t))) return !1;
          let r = A(t);
          const s = (null == r && t.ngModule) || void 0,
            i = void 0 === s ? t : s,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== s && (r = A(s)), null == r)) return !1;
          if (null != r.imports && !o) {
            let t;
            n.push(i);
            try {
              mt(r.imports, (r) => {
                this.processInjectorType(r, e, n) &&
                  (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e];
                mt(r, (t) => this.processProvider(t, n, r || Ys));
              }
          }
          this.injectorDefTypes.add(i), this.records.set(i, si(r.factory, Qs));
          const a = r.providers;
          if (null != a && !o) {
            const e = t;
            mt(a, (t) => this.processProvider(t, e, a));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = oi((t = V(t))) ? t : V(t && t.provide);
          const s = (function (t, e, n) {
            return ii(t) ? si(void 0, t.useValue) : si(ri(t, e, n), Qs);
          })(t, e, n);
          if (oi(t) || !0 !== t.multi) {
            const t = this.records.get(r);
            t && void 0 !== t.multi && hr();
          } else {
            let e = this.records.get(r);
            e
              ? void 0 === e.multi && hr()
              : ((e = si(void 0, Qs, !0)),
                (e.factory = () => dt(e.multi)),
                this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === Js
              ? (function (t) {
                  throw new Error(`Cannot instantiate cyclic dependency! ${t}`);
                })(U(t))
              : e.value === Qs && ((e.value = Js), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function ni(t) {
        const e = j(t),
          n = null !== e ? e.factory : Dt(t);
        if (null !== n) return n;
        const r = A(t);
        if (null !== r) return r.factory;
        if (t instanceof tt)
          throw new Error(`Token ${U(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = vt(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${U(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[k] || t[P] || (t[N] && t[N]()));
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\n` +
                      `This will become an error in v10. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function ri(t, e, n) {
        let r = void 0;
        if (oi(t)) {
          const e = V(t);
          return Dt(e) || ni(e);
        }
        if (ii(t)) r = () => V(t.useValue);
        else if ((s = t) && s.useFactory)
          r = () => t.useFactory(...dt(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          r = () => lt(V(t.useExisting));
        else {
          const s = V(t && (t.useClass || t.provide));
          if (
            (s ||
              (function (t, e, n) {
                let r = "";
                throw (
                  (t &&
                    e &&
                    (r = ` - only instances of Provider and Type are allowed, got: [${e
                      .map((t) => (t == n ? "?" + n + "?" : "..."))
                      .join(", ")}]`),
                  new Error(`Invalid provider for the NgModule '${U(t)}'` + r))
                );
              })(e, n, t),
            !(function (t) {
              return !!t.deps;
            })(t))
          )
            return Dt(s) || ni(s);
          r = () => new s(...dt(t.deps));
        }
        var s;
        return r;
      }
      function si(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function ii(t) {
        return null !== t && "object" == typeof t && st in t;
      }
      function oi(t) {
        return "function" == typeof t;
      }
      const ai = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = ti(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      let ci = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? ai(t, e, "")
              : ai(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = nt),
          (t.NULL = new ft()),
          (t.ɵprov = E({ token: t, providedIn: "any", factory: () => lt(et) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      const ui = new tt("AnalyzeForEntryComponents");
      let li = new Map();
      const hi = new Set();
      function di(t) {
        return "string" == typeof t ? t : t.text();
      }
      function fi(t, e) {
        let n = t.styles,
          r = t.classes,
          s = 0;
        for (let i = 0; i < e.length; i++) {
          const t = e[i];
          "number" == typeof t
            ? (s = t)
            : 1 == s
            ? (r = L(r, t))
            : 2 == s && (n = L(n, t + ": " + e[++i] + ";"));
        }
        null !== n && (t.styles = n), null !== r && (t.classes = r);
      }
      let pi = null;
      function gi() {
        if (!pi) {
          const t = Z.Symbol;
          if (t && t.iterator) pi = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (pi = n);
            }
          }
        }
        return pi;
      }
      function mi(t, e) {
        return (
          t === e ||
          ("number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e))
        );
      }
      class bi {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new bi(t);
        }
        static unwrap(t) {
          return bi.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof bi;
        }
      }
      function yi(t) {
        return (
          !!vi(t) && (Array.isArray(t) || (!(t instanceof Map) && gi() in t))
        );
      }
      function vi(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function wi(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function _i(t, e, n, r) {
        const s = oe();
        return (
          wi(s, pe(), e) &&
            (ae(),
            (function (t, e, n, r, s, i) {
              const o = Qt(t, e),
                a = e[11];
              if (null == r)
                Zt(a) ? a.removeAttribute(o, n, i) : o.removeAttribute(n);
              else {
                const e = null == s ? Be(r) : s(r, t.tagName || "", n);
                Zt(a)
                  ? a.setAttribute(o, n, e, i)
                  : i
                  ? o.setAttributeNS(i, n, e)
                  : o.setAttribute(n, e);
              }
            })(je(), s, t, e, n, r)),
          _i
        );
      }
      function Ci(t, e, n, r, s, i, o, a) {
        const c = oe(),
          u = ae(),
          l = t + 20,
          h = u.firstCreatePass
            ? (function (t, e, n, r, s, i, o, a, c) {
                const u = e.consts,
                  l = Ar(e, n[6], t, 0, o || null, ee(u, a));
                $r(e, n, l, ee(u, c)), Ie(e, l);
                const h = (l.tViews = Mr(
                    2,
                    -1,
                    r,
                    s,
                    i,
                    e.directiveRegistry,
                    e.pipeRegistry,
                    null,
                    e.schemas,
                    u
                  )),
                  d = Hr(0, null, 2, -1, null, null);
                return (
                  (d.injectorIndex = l.injectorIndex),
                  (h.node = d),
                  null !== e.queries &&
                    (e.queries.template(e, l),
                    (h.queries = e.queries.embeddedTView(l))),
                  l
                );
              })(t, u, c, e, n, r, s, i, o)
            : u.data[l];
        ue(h, !1);
        const d = c[11].createComment("");
        As(u, c, d, h),
          ur(d, c),
          is(c, (c[l] = ts(d, c, d, h))),
          Ft(h) && Dr(u, c, h),
          null != o && Ur(c, h, a);
      }
      function Si(t, e = S.Default) {
        const n = oe();
        return null == n ? lt(t, e) : sn(ce(), n, V(t), e);
      }
      function xi(t) {
        return (function (t, e) {
          if ("class" === e) return t.classes;
          if ("style" === e) return t.styles;
          const n = t.attrs;
          if (n) {
            const t = n.length;
            let r = 0;
            for (; r < t; ) {
              const s = n[r];
              if (Le(s)) break;
              if (0 === s) r += 2;
              else if ("number" == typeof s)
                for (r++; r < t && "string" == typeof n[r]; ) r++;
              else {
                if (s === e) return n[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(ce(), t);
      }
      function Oi() {
        throw new Error("invalid");
      }
      function Ei(t, e, n) {
        const r = oe();
        return wi(r, pe(), e) && Fr(ae(), je(), r, t, e, r[11], n, !1), Ei;
      }
      function Ti(t, e, n, r, s) {
        const i = s ? "class" : "style";
        ps(t, n, e.inputs[i], i, r);
      }
      function ji(t, e, n, r) {
        const s = oe(),
          i = ae(),
          o = 20 + t,
          a = s[11],
          c = (s[o] = jr(e, a, se.lFrame.currentNamespace)),
          u = i.firstCreatePass
            ? (function (t, e, n, r, s, i, o) {
                const a = e.consts,
                  c = ee(a, i),
                  u = Ar(e, n[6], t, 3, s, c);
                return (
                  $r(e, n, u, ee(a, o)),
                  null !== u.mergedAttrs && fi(u, u.mergedAttrs),
                  null !== e.queries && e.queries.elementStart(e, u),
                  u
                );
              })(t, i, s, 0, e, n, r)
            : i.data[o];
        ue(u, !0);
        const l = u.mergedAttrs;
        null !== l && Ue(a, c, l);
        const h = u.classes;
        null !== h && Us(a, c, h);
        const d = u.styles;
        null !== d && Ds(a, c, d),
          As(i, s, c, u),
          0 === se.lFrame.elementDepthCount && ur(c, s),
          se.lFrame.elementDepthCount++,
          Ft(u) &&
            (Dr(i, s, u),
            (function (t, e, n) {
              if (Ht(e)) {
                const r = e.directiveEnd;
                for (let s = e.directiveStart; s < r; s++) {
                  const e = t.data[s];
                  e.contentQueries && e.contentQueries(1, n[s], s);
                }
              }
            })(i, u, s)),
          null !== r && Ur(s, u);
      }
      function Ii() {
        let t = ce();
        le() ? he() : ((t = t.parent), ue(t, !1));
        const e = t;
        se.lFrame.elementDepthCount--;
        const n = ae();
        n.firstCreatePass && (Ie(n, t), Ht(t) && n.queries.elementEnd(t)),
          null !== e.classes &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            Ti(n, e, oe(), e.classes, !0),
          null !== e.styles &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            Ti(n, e, oe(), e.styles, !1);
      }
      function Ai(t, e, n, r) {
        ji(t, e, n, r), Ii();
      }
      function ki(t) {
        return !!t && "function" == typeof t.then;
      }
      function Ri(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      function Ni(t, e, n = !1, r) {
        const s = oe(),
          i = ae(),
          o = ce();
        return (
          (function (t, e, n, r, s, i, o = !1, a) {
            const c = Ft(r),
              u = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
              l = hs(e);
            let h = !0;
            if (3 === r.type) {
              const d = Qt(r, e),
                f = a ? a(d) : Ct,
                p = f.target || d,
                g = l.length,
                m = a ? (t) => a(Gt(t[r.index])).target : r.index;
              if (Zt(n)) {
                let o = null;
                if (
                  (!a &&
                    c &&
                    (o = (function (t, e, n, r) {
                      const s = t.cleanup;
                      if (null != s)
                        for (let i = 0; i < s.length - 1; i += 2) {
                          const t = s[i];
                          if (t === n && s[i + 1] === r) {
                            const t = e[7],
                              n = s[i + 2];
                            return t.length > n ? t[n] : null;
                          }
                          "string" == typeof t && (i += 2);
                        }
                      return null;
                    })(t, e, s, r.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i),
                    (o.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = Di(r, e, i, !1);
                  const t = n.listen(f.name || p, s, i);
                  l.push(i, t), u && u.push(s, m, g, g + 1);
                }
              } else
                (i = Di(r, e, i, !0)),
                  p.addEventListener(s, i, o),
                  l.push(i),
                  u && u.push(s, m, g, o);
            }
            const d = r.outputs;
            let f;
            if (h && null !== d && (f = d[s])) {
              const t = f.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[f[n]][f[n + 1]].subscribe(i),
                    o = l.length;
                  l.push(i, t), u && u.push(s, r.index, o, -(o + 1));
                }
            }
          })(i, s, s[11], o, t, e, n, r),
          Ni
        );
      }
      function Pi(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (r) {
          return fs(t, r), !1;
        }
      }
      function Di(t, e, n, r) {
        return function s(i) {
          if (i === Function) return n;
          const o = 2 & t.flags ? Yt(t.index, e) : e;
          0 == (32 & e[2]) && os(o);
          let a = Pi(e, n, i),
            c = s.__ngNextListenerFn__;
          for (; c; ) (a = Pi(e, c, i) && a), (c = c.__ngNextListenerFn__);
          return r && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a;
        };
      }
      function Ui(t = 1) {
        return (function (t) {
          return (se.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, se.lFrame.contextLView))[8];
        })(t);
      }
      function Li(t, e) {
        let n = null;
        const r = (function (t) {
          const e = t.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(t);
        for (let s = 0; s < e.length; s++) {
          const i = e[s];
          if ("*" !== i) {
            if (null === r ? vr(t, i, !0) : wr(r, i)) return s;
          } else n = s;
        }
        return n;
      }
      function Mi(t) {
        const e = oe()[16][6];
        if (!e.projection) {
          const n = (e.projection = vt(t ? t.length : 1, null)),
            r = n.slice();
          let s = e.child;
          for (; null !== s; ) {
            const e = t ? Li(s, t) : 0;
            null !== e &&
              (r[e] ? (r[e].projectionNext = s) : (n[e] = s), (r[e] = s)),
              (s = s.next);
          }
        }
      }
      function Hi(t, e = 0, n) {
        const r = oe(),
          s = ae(),
          i = Ar(s, r[6], t, 1, null, n || null);
        null === i.projection && (i.projection = e),
          he(),
          (function (t, e, n) {
            Ps(e[11], 0, e, n, xs(t, n, e), Is(n.parent || e[6], e));
          })(s, r, i);
      }
      function Vi(t, e = "") {
        const n = oe(),
          r = ae(),
          s = t + 20,
          i = r.firstCreatePass ? Ar(r, n[6], t, 3, null, null) : r.data[s],
          o = (n[s] = (function (t, e) {
            return Zt(e) ? e.createText(t) : e.createTextNode(t);
          })(e, n[11]));
        As(r, n, o, i), ue(i, !1);
      }
      function Fi(t, e, n) {
        const r = oe(),
          s = (function (t, e, n, r) {
            return wi(t, pe(), n) ? e + Be(n) + r : Sr;
          })(r, t, e, n);
        return (
          s !== Sr &&
            (function (t, e, n) {
              const r = (function (t, e) {
                  return Gt(e[t + 20]);
                })(e, t),
                s = t[11];
              Zt(s) ? s.setValue(r, n) : (r.textContent = n);
            })(r, Ee(), s),
          Fi
        );
      }
      function $i(t, e, n) {
        const r = oe();
        return wi(r, pe(), e) && Fr(ae(), je(), r, t, e, r[11], n, !0), $i;
      }
      function zi(t, e) {
        const n = Kt(t)[1],
          r = n.data.length - 1;
        Ie(n, { directiveStart: r, directiveEnd: r + 1 });
      }
      function qi(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const r = [t];
        for (; e; ) {
          let s = void 0;
          if ($t(t)) s = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components");
            s = e.ɵdir;
          }
          if (s) {
            if (n) {
              r.push(s);
              const e = t;
              (e.inputs = Bi(t.inputs)),
                (e.declaredInputs = Bi(t.declaredInputs)),
                (e.outputs = Bi(t.outputs));
              const n = s.hostBindings;
              n && Gi(t, n);
              const i = s.viewQuery,
                o = s.contentQueries;
              if (
                (i && Zi(t, i),
                o && Wi(t, o),
                O(t.inputs, s.inputs),
                O(t.declaredInputs, s.declaredInputs),
                O(t.outputs, s.outputs),
                $t(s) && s.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(s.data.animation);
              }
              (e.afterContentChecked =
                e.afterContentChecked || s.afterContentChecked),
                (e.afterContentInit = t.afterContentInit || s.afterContentInit),
                (e.afterViewChecked = t.afterViewChecked || s.afterViewChecked),
                (e.afterViewInit = t.afterViewInit || s.afterViewInit),
                (e.doCheck = t.doCheck || s.doCheck),
                (e.onDestroy = t.onDestroy || s.onDestroy),
                (e.onInit = t.onInit || s.onInit);
            }
            const e = s.features;
            if (e)
              for (let r = 0; r < e.length; r++) {
                const s = e[r];
                s && s.ngInherit && s(t), s === qi && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let r = t.length - 1; r >= 0; r--) {
            const s = t[r];
            (s.hostVars = e += s.hostVars),
              (s.hostAttrs = He(s.hostAttrs, (n = He(n, s.hostAttrs))));
          }
        })(r);
      }
      function Bi(t) {
        return t === Ct ? {} : t === St ? [] : t;
      }
      function Zi(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      function Wi(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, r, s) => {
              e(t, r, s), n(t, r, s);
            }
          : e;
      }
      function Gi(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      class Qi {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ji(t) {
        t.type.prototype.ngOnChanges &&
          ((t.setInput = Yi),
          (t.onChanges = function () {
            const t = Ki(this),
              e = t && t.current;
            if (e) {
              const n = t.previous;
              if (n === Ct) t.previous = e;
              else for (let t in e) n[t] = e[t];
              (t.current = null), this.ngOnChanges(e);
            }
          }));
      }
      function Yi(t, e, n, r) {
        const s =
            Ki(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: Ct, current: null }),
          i = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          c = o[a];
        (i[a] = new Qi(c && c.currentValue, e, o === Ct)), (t[r] = e);
      }
      function Ki(t) {
        return t.__ngSimpleChanges__ || null;
      }
      function Xi(t, e, n, r, s) {
        if (((t = V(t)), Array.isArray(t)))
          for (let i = 0; i < t.length; i++) Xi(t[i], e, n, r, s);
        else {
          const i = ae(),
            o = oe();
          let a = oi(t) ? t : V(t.provide),
            c = ri(t);
          const u = ce(),
            l = 65535 & u.providerIndexes,
            h = u.directiveStart,
            d = u.providerIndexes >> 16;
          if (oi(t) || !t.multi) {
            const r = new De(c, s, Si),
              f = no(a, e, s ? l : l + d, h);
            -1 === f
              ? (rn(Xe(u, o), i, a),
                to(i, t, e.length),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                s && (u.providerIndexes += 65536),
                n.push(r),
                o.push(r))
              : ((n[f] = r), (o[f] = r));
          } else {
            const f = no(a, e, l + d, h),
              p = no(a, e, l, l + d),
              g = f >= 0 && n[f],
              m = p >= 0 && n[p];
            if ((s && !m) || (!s && !g)) {
              rn(Xe(u, o), i, a);
              const l = (function (t, e, n, r, s) {
                const i = new De(t, n, Si);
                return (
                  (i.multi = []),
                  (i.index = e),
                  (i.componentProviders = 0),
                  eo(i, s, r && !n),
                  i
                );
              })(s ? so : ro, n.length, s, r, c);
              !s && m && (n[p].providerFactory = l),
                to(i, t, e.length, 0),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                s && (u.providerIndexes += 65536),
                n.push(l),
                o.push(l);
            } else to(i, t, f > -1 ? f : p, eo(n[s ? p : f], c, !s && r));
            !s && r && m && n[p].componentProviders++;
          }
        }
      }
      function to(t, e, n, r) {
        const s = oi(e);
        if (s || e.useClass) {
          const i = (e.useClass || e).prototype.ngOnDestroy;
          if (i) {
            const o = t.destroyHooks || (t.destroyHooks = []);
            if (!s && e.multi) {
              const t = o.indexOf(n);
              -1 === t ? o.push(n, [r, i]) : o[t + 1].push(r, i);
            } else o.push(n, i);
          }
        }
      }
      function eo(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function no(t, e, n, r) {
        for (let s = n; s < r; s++) if (e[s] === t) return s;
        return -1;
      }
      function ro(t, e, n, r) {
        return io(this.multi, []);
      }
      function so(t, e, n, r) {
        const s = this.multi;
        let i;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = un(n, n[1], this.providerFactory.index, r);
          (i = e.slice(0, t)), io(s, i);
          for (let n = t; n < e.length; n++) i.push(e[n]);
        } else (i = []), io(s, i);
        return i;
      }
      function io(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function oo(t, e = []) {
        return (n) => {
          n.providersResolver = (n, r) =>
            (function (t, e, n) {
              const r = ae();
              if (r.firstCreatePass) {
                const s = $t(t);
                Xi(n, r.data, r.blueprint, s, !0),
                  Xi(e, r.data, r.blueprint, s, !1);
              }
            })(n, r ? r(t) : t, e);
        };
      }
      Ji.ngInherit = !0;
      class ao {}
      class co {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${U(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let uo = (() => {
          class t {}
          return (t.NULL = new co()), t;
        })(),
        lo = (() => {
          class t {
            constructor(t) {
              this.nativeElement = t;
            }
          }
          return (t.__NG_ELEMENT_ID__ = () => ho(t)), t;
        })();
      const ho = function (t) {
        return $s(t, ce(), oe());
      };
      class fo {}
      const po = (function () {
        var t = { Important: 1, DashCase: 2 };
        return (t[t.Important] = "Important"), (t[t.DashCase] = "DashCase"), t;
      })();
      let go = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => mo()), t;
      })();
      const mo = function () {
        const t = oe(),
          e = Yt(ce().index, t);
        return (function (t) {
          const e = t[11];
          if (Zt(e)) return e;
          throw new Error(
            "Cannot inject Renderer2 when the application uses Renderer3!"
          );
        })(Lt(e) ? e : t);
      };
      let bo = (() => {
        class t {}
        return (
          (t.ɵprov = E({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class yo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const vo = new yo("9.1.7");
      class wo {
        constructor() {}
        supports(t) {
          return yi(t);
        }
        create(t) {
          return new Co(t);
        }
      }
      const _o = (t, e) => e;
      class Co {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || _o);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < Eo(n, r, s)) ? e : n,
              o = Eo(i, r, s),
              a = i.currentIndex;
            if (i === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) r++;
            else {
              s || (s = []);
              const t = o - r,
                e = a - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n;
                  e <= i && i < t && (s[n] = r + 1);
                }
                s[i.previousIndex] = e - t;
              }
            }
            o !== a && t(i, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !yi(t)))
            throw new Error(
              `Error trying to diff '${U(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && mi(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                    mi(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (i = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[gi()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && mi(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                      mi(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (i = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t, e;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = e
            )
              (t.previousIndex = t.currentIndex), (e = t._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (mi(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (mi(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : (t = this._addAfter(new So(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Oo()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Oo()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class So {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class xo {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && mi(n.trackById, t))
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class Oo {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new xo()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Eo(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class To {
        constructor() {}
        supports(t) {
          return t instanceof Map || vi(t);
        }
        create() {
          return new jo();
        }
      }
      class jo {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || vi(t)))
              throw new Error(
                `Error trying to diff '${U(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new Io(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          mi(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class Io {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let Ao = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new C(), new w()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = E({
              token: t,
              providedIn: "root",
              factory: () => new t([new wo()]),
            })),
            t
          );
        })(),
        ko = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new C(), new w()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = E({
              token: t,
              providedIn: "root",
              factory: () => new t([new To()]),
            })),
            t
          );
        })();
      const Ro = [new To()],
        No = new Ao([new wo()]),
        Po = new ko(Ro);
      let Do = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Uo(t, lo)), t;
      })();
      const Uo = function (t, e) {
        return zs(t, e, ce(), oe());
      };
      let Lo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Mo(t, lo)), t;
      })();
      const Mo = function (t, e) {
          return qs(t, e, ce(), oe());
        },
        Ho = {};
      class Vo extends uo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = Pt(t);
          return new zo(e, this.ngModule);
        }
      }
      function Fo(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const $o = new tt("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => We,
      });
      class zo extends ao {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Cr).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return Fo(this.componentDef.inputs);
        }
        get outputs() {
          return Fo(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const i = t.get(n, Ho, s);
                      return i !== Ho || r === Ho ? i : e.get(n, r, s);
                    },
                  };
                })(t, r.injector)
              : t,
            i = s.get(fo, Wt),
            o = s.get(bo, null),
            a = i.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            u = n
              ? (function (t, e, n) {
                  if (Zt(t)) return t.selectRootElement(e, n === _t.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(a, n, this.componentDef.encapsulation)
              : jr(
                  c,
                  i.createRenderer(null, this.componentDef),
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(c)
                ),
            l = this.componentDef.onPush ? 576 : 528,
            h =
              "string" == typeof n && /^#root-ng-internal-isolated-\d+/.test(n),
            d = {
              components: [],
              scheduler: We,
              clean: ls,
              playerHandler: null,
              flags: 0,
            },
            f = Mr(0, -1, null, 1, 0, null, null, null, null, null),
            p = Ir(null, f, d, l, null, null, i, a, o, s);
          let g, m;
          we(p, null);
          try {
            const t = (function (t, e, n, r, s, i) {
              const o = n[1];
              n[20] = t;
              const a = Ar(o, null, 0, 3, null, null),
                c = (a.mergedAttrs = e.hostAttrs);
              null !== c &&
                (fi(a, c),
                null !== t &&
                  (Ue(s, t, c),
                  null !== a.classes && Us(s, t, a.classes),
                  null !== a.styles && Ds(s, t, a.styles)));
              const u = r.createRenderer(t, e),
                l = Ir(
                  n,
                  Lr(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  r,
                  u,
                  void 0
                );
              return (
                o.firstCreatePass &&
                  (rn(Xe(a, n), o, e.type), Wr(o, a), Qr(a, n.length, 1)),
                is(n, l),
                (n[20] = l)
              );
            })(u, this.componentDef, p, i, a);
            if (u)
              if (n) Ue(a, u, ["ng-version", vo.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let i = t[r];
                    if ("string" == typeof i)
                      2 === s
                        ? "" !== i && e.push(i, t[++r])
                        : 8 === s && n.push(i);
                    else {
                      if (!br(s)) break;
                      s = i;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && Ue(a, u, t), e && e.length > 0 && Us(a, u, e.join(" "));
              }
            if (((m = Jt(f, 0)), void 0 !== e)) {
              const t = (m.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null);
              }
            }
            (g = (function (t, e, n, r, s) {
              const i = n[1],
                o = (function (t, e, n) {
                  const r = ce();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Zr(t, r, 1),
                    Jr(t, e, n));
                  const s = un(e, t, e.length - 1, r);
                  ur(s, e);
                  const i = Qt(r, e);
                  return i && ur(i, e), s;
                })(i, n, e);
              r.components.push(o),
                (t[8] = o),
                s && s.forEach((t) => t(o, e)),
                e.contentQueries && e.contentQueries(1, o, n.length - 1);
              const a = ce();
              if (
                i.firstCreatePass &&
                (null !== e.hostBindings || null !== e.hostAttrs)
              ) {
                Te(a.index - 20);
                const t = n[1];
                zr(t, e), qr(t, n, e.hostVars), Br(e, o);
              }
              return o;
            })(t, this.componentDef, p, d, [zi])),
              kr(f, p, null);
          } finally {
            Oe();
          }
          const b = new qo(this.componentType, g, $s(lo, m, p), p, m);
          return (n && !h) || (b.hostView._tViewNode.child = m), b;
        }
      }
      class qo extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.destroyCbs = []),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new Ms(r)),
            (this.hostView._tViewNode = (function (t, e, n, r) {
              let s = t.node;
              return (
                null == s && (t.node = s = Hr(0, null, 2, -1, null, null)),
                (r[6] = s)
              );
            })(r[1], 0, 0, r)),
            (this.componentType = t);
        }
        get injector() {
          return new dn(this._tNode, this._rootLView);
        }
        destroy() {
          this.destroyCbs &&
            (this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null),
            !this.hostView.destroyed && this.hostView.destroy());
        }
        onDestroy(t) {
          this.destroyCbs && this.destroyCbs.push(t);
        }
      }
      const Bo = void 0;
      var Zo = [
        "en",
        [["a", "p"], ["AM", "PM"], Bo],
        [["AM", "PM"], Bo, Bo],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Bo,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Bo,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Bo, "{1} 'at' {0}", Bo],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Wo = {};
      function Go(t, e, n) {
        "string" != typeof e && ((n = e), (e = t[Xo.LocaleId])),
          (e = e.toLowerCase().replace(/_/g, "-")),
          (Wo[e] = t),
          n && (Wo[e][Xo.ExtraData] = n);
      }
      function Qo(t) {
        const e = (function (t) {
          return t.toLowerCase().replace(/_/g, "-");
        })(t);
        let n = Ko(e);
        if (n) return n;
        const r = e.split("-")[0];
        if (((n = Ko(r)), n)) return n;
        if ("en" === r) return Zo;
        throw new Error(`Missing locale data for the locale "${t}".`);
      }
      function Jo(t) {
        return Qo(t)[Xo.CurrencyCode] || null;
      }
      function Yo(t) {
        return Qo(t)[Xo.PluralCase];
      }
      function Ko(t) {
        return (
          t in Wo ||
            (Wo[t] =
              Z.ng &&
              Z.ng.common &&
              Z.ng.common.locales &&
              Z.ng.common.locales[t]),
          Wo[t]
        );
      }
      const Xo = (function () {
        var t = {
          LocaleId: 0,
          DayPeriodsFormat: 1,
          DayPeriodsStandalone: 2,
          DaysFormat: 3,
          DaysStandalone: 4,
          MonthsFormat: 5,
          MonthsStandalone: 6,
          Eras: 7,
          FirstDayOfWeek: 8,
          WeekendRange: 9,
          DateFormat: 10,
          TimeFormat: 11,
          DateTimeFormat: 12,
          NumberSymbols: 13,
          NumberFormats: 14,
          CurrencyCode: 15,
          CurrencySymbol: 16,
          CurrencyName: 17,
          Currencies: 18,
          Directionality: 19,
          PluralCase: 20,
          ExtraData: 21,
        };
        return (
          (t[t.LocaleId] = "LocaleId"),
          (t[t.DayPeriodsFormat] = "DayPeriodsFormat"),
          (t[t.DayPeriodsStandalone] = "DayPeriodsStandalone"),
          (t[t.DaysFormat] = "DaysFormat"),
          (t[t.DaysStandalone] = "DaysStandalone"),
          (t[t.MonthsFormat] = "MonthsFormat"),
          (t[t.MonthsStandalone] = "MonthsStandalone"),
          (t[t.Eras] = "Eras"),
          (t[t.FirstDayOfWeek] = "FirstDayOfWeek"),
          (t[t.WeekendRange] = "WeekendRange"),
          (t[t.DateFormat] = "DateFormat"),
          (t[t.TimeFormat] = "TimeFormat"),
          (t[t.DateTimeFormat] = "DateTimeFormat"),
          (t[t.NumberSymbols] = "NumberSymbols"),
          (t[t.NumberFormats] = "NumberFormats"),
          (t[t.CurrencyCode] = "CurrencyCode"),
          (t[t.CurrencySymbol] = "CurrencySymbol"),
          (t[t.CurrencyName] = "CurrencyName"),
          (t[t.Currencies] = "Currencies"),
          (t[t.Directionality] = "Directionality"),
          (t[t.PluralCase] = "PluralCase"),
          (t[t.ExtraData] = "ExtraData"),
          t
        );
      })();
      let ta = "en-US";
      function ea(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(
                `ASSERTION ERROR: ${t}` + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (ta = t.toLowerCase().replace(/_/g, "-"));
      }
      const na = new Map();
      class ra extends pt {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Vo(this));
          const n = Ut(t),
            r = t[Y] || null;
          r && ea(r),
            (this._bootstrapComponents = Qe(n.bootstrap)),
            (this._r3Injector = ti(
              t,
              e,
              [
                { provide: pt, useValue: this },
                { provide: uo, useValue: this.componentFactoryResolver },
              ],
              U(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = ci.THROW_IF_NOT_FOUND, n = S.Default) {
          return t === ci || t === pt || t === et
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class sa extends gt {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Ut(t) &&
              (function t(e) {
                if (null !== e.ɵmod.id) {
                  const t = e.ɵmod.id;
                  (function (t, e, n) {
                    if (e && e !== n)
                      throw new Error(
                        `Duplicate module registered for ${t} - ${U(e)} vs ${U(
                          e.name
                        )}`
                      );
                  })(t, na.get(t), e),
                    na.set(t, e);
                }
                let n = e.ɵmod.imports;
                n instanceof Function && (n = n()), n && n.forEach((e) => t(e));
              })(t);
        }
        create(t) {
          return new ra(this.moduleType, t);
        }
      }
      function ia(t, e) {
        const n = ae();
        let r;
        const s = t + 20;
        n.firstCreatePass
          ? ((r = (function (t, e) {
              if (e)
                for (let n = e.length - 1; n >= 0; n--) {
                  const r = e[n];
                  if (t === r.name) return r;
                }
              throw new Error(`The pipe '${t}' could not be found!`);
            })(e, n.pipeRegistry)),
            (n.data[s] = r),
            r.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(s, r.onDestroy))
          : (r = n.data[s]);
        const i = r.factory || (r.factory = Dt(r.type)),
          o = ct(Si),
          a = Ye(!1),
          c = i();
        return (
          Ye(a),
          ct(o),
          (function (t, e, n, r) {
            const s = n + 20;
            s >= t.data.length && ((t.data[s] = null), (t.blueprint[s] = null)),
              (e[s] = r);
          })(n, oe(), t, c),
          c
        );
      }
      function oa(t, e, n) {
        const r = oe(),
          s = (function (t, e) {
            return t[e + 20];
          })(r, t);
        return (function (t, e) {
          return (
            bi.isWrapped(e) &&
              ((e = bi.unwrap(e)), (t[se.lFrame.bindingIndex] = Sr)),
            e
          );
        })(
          r,
          (function (t, e) {
            return t[1].data[e + 20].pure;
          })(r, t)
            ? (function (t, e, n, r, s, i) {
                const o = e + n;
                return wi(t, o, s)
                  ? (function (t, e, n) {
                      return (t[e] = n);
                    })(t, o + 1, i ? r.call(i, s) : r(s))
                  : (function (t, e) {
                      const n = t[e];
                      return n === Sr ? void 0 : n;
                    })(t, o + 1);
              })(
                r,
                (function () {
                  const t = se.lFrame;
                  let e = t.bindingRootIndex;
                  return (
                    -1 === e &&
                      (e = t.bindingRootIndex = t.tView.bindingStartIndex),
                    e
                  );
                })(),
                e,
                s.transform,
                n,
                s
              )
            : s.transform(n)
        );
      }
      class aa extends r.a {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let r,
            i = (t) => null,
            o = () => null;
          t && "object" == typeof t
            ? ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t.next(e));
                  }
                : (e) => {
                    t.next(e);
                  }),
              t.error &&
                (i = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.error(e));
                    }
                  : (e) => {
                      t.error(e);
                    }),
              t.complete &&
                (o = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t(e));
                  }
                : (e) => {
                    t(e);
                  }),
              e &&
                (i = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e(t));
                    }
                  : (t) => {
                      e(t);
                    }),
              n &&
                (o = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const a = super.subscribe(r, i, o);
          return t instanceof s.a && t.add(a), a;
        }
      }
      function ca() {
        return this._results[gi()]();
      }
      class ua {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new aa()),
            (this.length = 0);
          const t = gi(),
            e = ua.prototype;
          e[t] || (e[t] = ca);
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t) {
          (this._results = (function t(e, n) {
            void 0 === n && (n = e);
            for (let r = 0; r < e.length; r++) {
              let s = e[r];
              Array.isArray(s)
                ? (n === e && (n = e.slice(0, r)), t(s, n))
                : n !== e && n.push(s);
            }
            return n;
          })(t)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class la {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new la(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class ha {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              r.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new ha(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== Ea(t, e).matches && this.queries[e].setDirty();
        }
      }
      class da {
        constructor(t, e, n, r = null) {
          (this.predicate = t),
            (this.descendants = e),
            (this.isStatic = n),
            (this.read = r);
        }
      }
      class fa {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const r = null !== e ? e.length : 0,
              s = this.getByIndex(n).embeddedTView(t, r);
            s &&
              ((s.indexInDeclarationView = n),
              null !== e ? e.push(s) : (e = [s]));
          }
          return null !== e ? new fa(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class pa {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new pa(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && !1 === this.metadata.descendants) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 4 === n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          if (Array.isArray(this.metadata.predicate)) {
            const n = this.metadata.predicate;
            for (let r = 0; r < n.length; r++)
              this.matchTNodeWithReadOption(t, e, ga(e, n[r]));
          } else {
            const n = this.metadata.predicate;
            n === Do
              ? 0 === e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, cn(e, t, n, !1, !1));
          }
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === lo || r === Lo || (r === Do && 0 === e.type))
                this.addMatch(e.index, -2);
              else {
                const n = cn(e, t, r, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function ga(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
        return null;
      }
      function ma(t, e, n, r) {
        return -1 === n
          ? (function (t, e) {
              return 3 === t.type || 4 === t.type
                ? $s(lo, t, e)
                : 0 === t.type
                ? zs(Do, lo, t, e)
                : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === lo
                ? $s(lo, e, t)
                : n === Do
                ? zs(Do, lo, e, t)
                : n === Lo
                ? qs(Lo, lo, e, t)
                : void 0;
            })(t, e, r)
          : un(t, t[1], n, e);
      }
      function ba(t, e, n, r) {
        const s = e[19].queries[r];
        if (null === s.matches) {
          const r = t.data,
            i = n.matches,
            o = [];
          for (let t = 0; t < i.length; t += 2) {
            const s = i[t];
            o.push(s < 0 ? null : ma(e, r[s], i[t + 1], n.metadata.read));
          }
          s.matches = o;
        }
        return s.matches;
      }
      function ya(t) {
        const e = oe(),
          n = ae(),
          r = be();
        ye(r + 1);
        const s = Ea(n, r);
        if (t.dirty && Xt(e) === s.metadata.isStatic) {
          if (null === s.matches) t.reset([]);
          else {
            const i = s.crossesNgTemplate
              ? (function t(e, n, r, s) {
                  const i = e.queries.getByIndex(r),
                    o = i.matches;
                  if (null !== o) {
                    const a = ba(e, n, i, r);
                    for (let e = 0; e < o.length; e += 2) {
                      const r = o[e];
                      if (r > 0) s.push(a[e / 2]);
                      else {
                        const i = o[e + 1],
                          a = n[-r];
                        for (let e = 10; e < a.length; e++) {
                          const n = a[e];
                          n[17] === n[3] && t(n[1], n, i, s);
                        }
                        if (null !== a[9]) {
                          const e = a[9];
                          for (let n = 0; n < e.length; n++) {
                            const r = e[n];
                            t(r[1], r, i, s);
                          }
                        }
                      }
                    }
                  }
                  return s;
                })(n, e, r, [])
              : ba(n, e, s, r);
            t.reset(i), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function va(t, e, n) {
        _a(ae(), oe(), t, e, n, !0);
      }
      function wa(t, e, n) {
        _a(ae(), oe(), t, e, n, !1);
      }
      function _a(t, e, n, r, s, i) {
        t.firstCreatePass &&
          (Oa(t, new da(n, r, i, s), -1), i && (t.staticViewQueries = !0)),
          xa(t, e);
      }
      function Ca(t, e, n, r) {
        !(function (t, e, n, r, s, i, o, a) {
          t.firstCreatePass &&
            (Oa(t, new da(n, r, !1, s), o.index),
            (function (t, e) {
              const n = t.contentQueries || (t.contentQueries = []);
              e !== (t.contentQueries.length ? n[n.length - 1] : -1) &&
                n.push(t.queries.length - 1, e);
            })(t, a)),
            xa(t, e);
        })(ae(), oe(), e, n, r, 0, ce(), t);
      }
      function Sa() {
        return (t = oe()), (e = be()), t[19].queries[e].queryList;
        var t, e;
      }
      function xa(t, e) {
        const n = new ua();
        !(function (t, e, n, r) {
          const s = hs(e);
          s.push(n), t.firstCreatePass && ds(t).push(r, s.length - 1);
        })(t, e, n, n.destroy),
          null === e[19] && (e[19] = new ha()),
          e[19].queries.push(new la(n));
      }
      function Oa(t, e, n) {
        null === t.queries && (t.queries = new fa()),
          t.queries.track(new pa(e, n));
      }
      function Ea(t, e) {
        return t.queries.getByIndex(e);
      }
      function Ta(t = S.Default) {
        const e = Bs(!0);
        if (null != e || t & S.Optional) return e;
        throw new Error("No provider for ChangeDetectorRef!");
      }
      const ja = new tt("Application Initializer");
      let Ia = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                ki(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(lt(ja, 8));
          }),
          (t.ɵprov = E({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Aa = new tt("AppId"),
        ka = {
          provide: Aa,
          useFactory: function () {
            return `${Ra()}${Ra()}${Ra()}`;
          },
          deps: [],
        };
      function Ra() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Na = new tt("Platform Initializer"),
        Pa = new tt("Platform ID"),
        Da = new tt("appBootstrapListener");
      let Ua = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = E({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const La = new tt("LocaleId"),
        Ma = new tt("DefaultCurrencyCode");
      class Ha {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const Va = function (t) {
          return new sa(t);
        },
        Fa = Va,
        $a = function (t) {
          return Promise.resolve(Va(t));
        },
        za = function (t) {
          const e = Va(t),
            n = Qe(Ut(t).declarations).reduce((t, e) => {
              const n = Pt(e);
              return n && t.push(new zo(n)), t;
            }, []);
          return new Ha(e, n);
        },
        qa = za,
        Ba = function (t) {
          return Promise.resolve(za(t));
        };
      let Za = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = Fa),
              (this.compileModuleAsync = $a),
              (this.compileModuleAndAllComponentsSync = qa),
              (this.compileModuleAndAllComponentsAsync = Ba);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = E({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Wa = new tt("compilerOptions"),
        Ga = (() => Promise.resolve(0))();
      function Qa(t) {
        "undefined" == typeof Zone
          ? Ga.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Ja {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new aa(!1)),
            (this.onMicrotaskEmpty = new aa(!1)),
            (this.onStable = new aa(!1)),
            (this.onError = new aa(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            (this.shouldCoalesceEventChangeDetection = e),
            (this.lastRequestAnimationFrameId = -1),
            (this.nativeRequestAnimationFrame = (function () {
              let t = Z.requestAnimationFrame,
                e = Z.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function (t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                        Z,
                        () => {
                          (t.lastRequestAnimationFrameId = -1), tc(t), Xa(t);
                        }
                      )),
                      tc(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, r, s, i, o, a) => {
                  try {
                    return ec(t), n.invokeTask(s, i, o, a);
                  } finally {
                    e && "eventTask" === i.type && e(), nc(t);
                  }
                },
                onInvoke: (e, n, r, s, i, o, a) => {
                  try {
                    return ec(t), e.invoke(r, s, i, o, a);
                  } finally {
                    nc(t);
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          tc(t),
                          Xa(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, r, s) => (
                  e.handleError(r, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(this);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Ja.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Ja.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + r, t, Ka, Ya, Ya);
          try {
            return s.runTask(i, e, n);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      function Ya() {}
      const Ka = {};
      function Xa(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function tc(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function ec(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function nc(t) {
        t._nesting--, Xa(t);
      }
      class rc {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new aa()),
            (this.onMicrotaskEmpty = new aa()),
            (this.onStable = new aa()),
            (this.onError = new aa());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let sc = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ja.assertNotInAngularZone(),
                        Qa(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Qa(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== r
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(lt(Ja));
            }),
            (t.ɵprov = E({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        ic = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), uc.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return uc.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = E({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class oc {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      function ac(t) {
        uc = t;
      }
      let cc,
        uc = new oc(),
        lc = function (t, e, n) {
          const r = t.get(Wa, []).concat(e),
            s = new sa(n);
          if (0 === li.size) return Promise.resolve(s);
          const i = (function (t) {
            const e = [];
            return t.forEach((t) => t && e.push(...t)), e;
          })(r.map((t) => t.providers));
          if (0 === i.length) return Promise.resolve(s);
          const o = (function () {
              const t = Z.ng;
              if (!t || !t.ɵcompilerFacade)
                throw new Error(
                  "Angular JIT compilation failed: '@angular/compiler' not loaded!\n  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.\n  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?\n  - Alternatively provide the compiler with 'import \"@angular/compiler\";' before bootstrapping."
                );
              return t.ɵcompilerFacade;
            })(),
            a = ci.create({ providers: i }).get(o.ResourceLoader);
          return (function (t) {
            const e = [],
              n = new Map();
            function r(t) {
              let e = n.get(t);
              if (!e) {
                const r = ((t) => Promise.resolve(a.get(t)))(t);
                n.set(t, (e = r.then(di)));
              }
              return e;
            }
            return (
              li.forEach((t, n) => {
                const s = [];
                t.templateUrl &&
                  s.push(
                    r(t.templateUrl).then((e) => {
                      t.template = e;
                    })
                  );
                const i = t.styleUrls,
                  o = t.styles || (t.styles = []),
                  a = t.styles.length;
                i &&
                  i.forEach((e, n) => {
                    o.push(""),
                      s.push(
                        r(e).then((r) => {
                          (o[a + n] = r),
                            i.splice(i.indexOf(e), 1),
                            0 == i.length && (t.styleUrls = void 0);
                        })
                      );
                  });
                const c = Promise.all(s).then(() =>
                  (function (t) {
                    hi.delete(t);
                  })(n)
                );
                e.push(c);
              }),
              (li = new Map()),
              Promise.all(e).then(() => {})
            );
          })().then(() => s);
        };
      const hc = new tt("AllowMultipleToken");
      class dc {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function fc(t, e, n = []) {
        const r = `Platform: ${e}`,
          s = new tt(r);
        return (e = []) => {
          let i = pc();
          if (!i || i.injector.get(hc, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: Gs, useValue: "platform" }
                );
              !(function (t) {
                if (cc && !cc.destroyed && !cc.injector.get(hc, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                cc = t.get(gc);
                const e = t.get(Na, null);
                e && e.forEach((t) => t());
              })(ci.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = pc();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function pc() {
        return cc && !cc.destroyed ? cc : null;
      }
      let gc = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new rc()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Ja({
                          enableLongStackTrace: Pn(),
                          shouldCoalesceEventChangeDetection: e,
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              r = [{ provide: Ja, useValue: n }];
            return n.run(() => {
              const e = ci.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                s = t.create(e),
                i = s.injector.get(bn, null);
              if (!i)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                s.onDestroy(() => yc(this._modules, s)),
                n.runOutsideAngular(() =>
                  n.onError.subscribe({
                    next: (t) => {
                      i.handleError(t);
                    },
                  })
                ),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return ki(r)
                      ? r.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(i, n, () => {
                  const t = s.injector.get(Ia);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        ea(s.injector.get(La, "en-US") || "en-US"),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = mc({}, e);
            return lc(this.injector, n, t).then((t) =>
              this.bootstrapModuleFactory(t, n)
            );
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(bc);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${U(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                    "Please define one of these."
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(lt(ci));
          }),
          (t.ɵprov = E({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function mc(t, e) {
        return Array.isArray(e)
          ? e.reduce(mc, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let bc = (() => {
        class t {
          constructor(t, e, n, r, s, u) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = u),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = Pn()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const h = new i.a((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              d = new i.a((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Ja.assertNotInAngularZone(),
                      Qa(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Ja.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              return (
                Object(o.a)(r)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof i.a
                  ? t[0]
                  : Object(a.a)(e)(Object(c.a)(t, n))
              );
            })(
              h,
              d.pipe((t) => {
                return l()(
                  ((e = m),
                  function (t) {
                    let n;
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const r = Object.create(t, p);
                    return (r.source = t), (r.subjectFactory = n), r;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof ao
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(pt),
              s = n.create(ci.NULL, [], e || n.selector, r);
            s.onDestroy(() => {
              this._unloadComponent(s);
            });
            const i = s.injector.get(sc, null);
            return (
              i &&
                s.injector
                  .get(ic)
                  .registerApplication(s.location.nativeElement, i),
              this._loadComponent(s),
              Pn() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
              if (this._enforceNoNewChanges)
                for (let t of this._views) t.checkNoChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            yc(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(Da, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          _unloadComponent(t) {
            this.detachView(t.hostView), yc(this.components, t);
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(lt(Ja), lt(Ua), lt(ci), lt(bn), lt(uo), lt(Ia));
          }),
          (t.ɵprov = E({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function yc(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class vc {}
      class wc {}
      const _c = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let Cc = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || _c);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, r] = t.split("#");
            return (
              void 0 === r && (r = "default"),
              n("zn8P")(e)
                .then((t) => t[r])
                .then((t) => Sc(t, e, r))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, r] = t.split("#"),
              s = "NgFactory";
            return (
              void 0 === r && ((r = "default"), (s = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[r + s])
                .then((t) => Sc(t, e, r))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(lt(Za), lt(wc, 8));
          }),
          (t.ɵprov = E({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Sc(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const xc = function (t) {
          return null;
        },
        Oc = fc(null, "core", [
          { provide: Pa, useValue: "unknown" },
          { provide: gc, deps: [ci] },
          { provide: ic, deps: [] },
          { provide: Ua, deps: [] },
        ]),
        Ec = [
          { provide: bc, useClass: bc, deps: [Ja, Ua, ci, bn, uo, Ia] },
          {
            provide: $o,
            deps: [Ja],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: Ia, useClass: Ia, deps: [[new w(), ja]] },
          { provide: Za, useClass: Za, deps: [] },
          ka,
          {
            provide: Ao,
            useFactory: function () {
              return No;
            },
            deps: [],
          },
          {
            provide: ko,
            useFactory: function () {
              return Po;
            },
            deps: [],
          },
          {
            provide: La,
            useFactory: function (t) {
              return (
                ea(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    "en-US")
                ),
                t
              );
            },
            deps: [[new v(La), new w(), new C()]],
          },
          { provide: Ma, useValue: "USD" },
        ];
      let Tc = (() => {
        class t {
          constructor(t) {}
        }
        return (
          (t.ɵmod = It({ type: t })),
          (t.ɵinj = T({
            factory: function (e) {
              return new (e || t)(lt(bc));
            },
            providers: Ec,
          })),
          t
        );
      })();
    },
    gRHU: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      var r = n("2fFW"),
        s = n("NJ4a");
      const i = {
        closed: !0,
        next(t) {},
        error(t) {
          if (r.a.useDeprecatedSynchronousErrorHandling) throw t;
          Object(s.a)(t);
        },
        complete() {},
      };
    },
    itXk: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return u;
      });
      var r = n("z+Ro"),
        s = n("DH7j"),
        i = n("l7GE"),
        o = n("ZUHj"),
        a = n("yCtX");
      const c = {};
      function u(...t) {
        let e = null,
          n = null;
        return (
          Object(r.a)(t[t.length - 1]) && (n = t.pop()),
          "function" == typeof t[t.length - 1] && (e = t.pop()),
          1 === t.length && Object(s.a)(t[0]) && (t = t[0]),
          Object(a.a)(t, n).lift(new l(e))
        );
      }
      class l {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new h(t, this.resultSelector));
        }
      }
      class h extends i.a {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(c), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) {
              const e = t[n];
              this.add(Object(o.a)(this, e, e, n));
            }
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n, r, s) {
          const i = this.values,
            o = this.toRespond
              ? i[n] === c
                ? --this.toRespond
                : this.toRespond
              : 0;
          (i[n] = e),
            0 === o &&
              (this.resultSelector
                ? this._tryResultSelector(i)
                : this.destination.next(i.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
    },
    jZKg: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return i;
      });
      var r = n("HDdC"),
        s = n("quSY");
      function i(t, e) {
        return new r.a((n) => {
          const r = new s.a();
          let i = 0;
          return (
            r.add(
              e.schedule(function () {
                i !== t.length
                  ? (n.next(t[i++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
    },
    kJWO: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      });
      const r = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
    },
    l7GE: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return s;
      });
      var r = n("7o/Q");
      class s extends r.a {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
    },
    lJxs: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return s;
      });
      var r = n("7o/Q");
      function s(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new i(t, e));
        };
      }
      class i {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new o(t, this.project, this.thisArg));
        }
      }
      class o extends r.a {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
    },
    mCNh: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return s;
      }),
        n.d(e, "b", function () {
          return i;
        });
      var r = n("SpAZ");
      function s(...t) {
        return i(t);
      }
      function i(t) {
        return 0 === t.length
          ? r.a
          : 1 === t.length
          ? t[0]
          : function (e) {
              return t.reduce((t, e) => e(t), e);
            };
      }
    },
    n6bG: function (t, e, n) {
      "use strict";
      function r(t) {
        return "function" == typeof t;
      }
      n.d(e, "a", function () {
        return r;
      });
    },
    ngJS: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return r;
      });
      const r = (t) => (e) => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
    },
    ofXK: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return w;
      }),
        n.d(e, "b", function () {
          return M;
        }),
        n.d(e, "c", function () {
          return V;
        }),
        n.d(e, "d", function () {
          return c;
        }),
        n.d(e, "e", function () {
          return C;
        }),
        n.d(e, "f", function () {
          return H;
        }),
        n.d(e, "g", function () {
          return h;
        }),
        n.d(e, "h", function () {
          return S;
        }),
        n.d(e, "i", function () {
          return y;
        }),
        n.d(e, "j", function () {
          return k;
        }),
        n.d(e, "k", function () {
          return _;
        }),
        n.d(e, "l", function () {
          return u;
        }),
        n.d(e, "m", function () {
          return $;
        }),
        n.d(e, "n", function () {
          return a;
        }),
        n.d(e, "o", function () {
          return F;
        }),
        n.d(e, "p", function () {
          return i;
        }),
        n.d(e, "q", function () {
          return A;
        }),
        n.d(e, "r", function () {
          return o;
        });
      var r = n("fXoL");
      let s = null;
      function i() {
        return s;
      }
      function o(t) {
        s || (s = t);
      }
      class a {}
      const c = new r.q("DocumentToken");
      let u = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = Object(r.Eb)({
            factory: l,
            token: t,
            providedIn: "platform",
          })),
          t
        );
      })();
      function l() {
        return Object(r.Ob)(d);
      }
      const h = new r.q("Location Initialized");
      let d = (() => {
        class t extends u {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = i().getLocation()),
              (this._history = i().getHistory());
          }
          getBaseHrefFromDOM() {
            return i().getBaseHref(this._doc);
          }
          onPopState(t) {
            i()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            i()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            f() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            f()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.Ob(c));
          }),
          (t.ɵprov = Object(r.Eb)({
            factory: p,
            token: t,
            providedIn: "platform",
          })),
          t
        );
      })();
      function f() {
        return !!window.history.pushState;
      }
      function p() {
        return new d(Object(r.Ob)(c));
      }
      function g(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function m(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function b(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let y = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = Object(r.Eb)({
            factory: v,
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      function v(t) {
        const e = Object(r.Ob)(c).location;
        return new _(Object(r.Ob)(u), (e && e.origin) || "");
      }
      const w = new r.q("appBaseHref");
      let _ = (() => {
          class t extends y {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return g(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  b(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + b(r));
              this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + b(r));
              this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Ob(u), r.Ob(w, 8));
            }),
            (t.ɵprov = r.Eb({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        C = (() => {
          class t extends y {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e);
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = g(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + b(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + b(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Ob(u), r.Ob(w, 8));
            }),
            (t.ɵprov = r.Eb({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        S = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new r.n()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = m(O(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + b(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, O(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + b(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + b(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this.subscribe((t) => {
                  this._notifyUrlChangeListeners(t.url, t.state);
                });
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Ob(y), r.Ob(u));
            }),
            (t.normalizeQueryParams = b),
            (t.joinWithSlash = g),
            (t.stripTrailingSlash = m),
            (t.ɵprov = Object(r.Eb)({
              factory: x,
              token: t,
              providedIn: "root",
            })),
            t
          );
        })();
      function x() {
        return new S(Object(r.Ob)(y), Object(r.Ob)(u));
      }
      function O(t) {
        return t.replace(/\/index.html$/, "");
      }
      const E = (function () {
          var t = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
          return (
            (t[t.Zero] = "Zero"),
            (t[t.One] = "One"),
            (t[t.Two] = "Two"),
            (t[t.Few] = "Few"),
            (t[t.Many] = "Many"),
            (t[t.Other] = "Other"),
            t
          );
        })(),
        T = r.lb;
      class j {}
      let I = (() => {
        class t extends j {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (T(e || this.locale)(t)) {
              case E.Zero:
                return "zero";
              case E.One:
                return "one";
              case E.Two:
                return "two";
              case E.Few:
                return "few";
              case E.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.Ob(r.u));
          }),
          (t.ɵprov = r.Eb({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function A(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(";")) {
          const t = n.indexOf("="),
            [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
          if (r.trim() === e) return decodeURIComponent(s);
        }
        return null;
      }
      let k = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new R()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            N("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            N("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.Ib(r.N), r.Ib(r.K));
          }),
          (t.ɵdir = r.Db({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class R {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function N(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${Object(r.ub)(e)}'.`
          );
      }
      class P {
        createSubscription(t, e) {
          return t.subscribe({
            next: e,
            error: (t) => {
              throw t;
            },
          });
        }
        dispose(t) {
          t.unsubscribe();
        }
        onDestroy(t) {
          t.unsubscribe();
        }
      }
      class D {
        createSubscription(t, e) {
          return t.then(e, (t) => {
            throw t;
          });
        }
        dispose(t) {}
        onDestroy(t) {}
      }
      const U = new D(),
        L = new P();
      let M = (() => {
          class t {
            constructor(t) {
              (this._ref = t),
                (this._latestValue = null),
                (this._latestReturnedValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null);
            }
            ngOnDestroy() {
              this._subscription && this._dispose();
            }
            transform(t) {
              return this._obj
                ? t !== this._obj
                  ? (this._dispose(), this.transform(t))
                  : Object(r.rb)(this._latestValue, this._latestReturnedValue)
                  ? this._latestReturnedValue
                  : ((this._latestReturnedValue = this._latestValue),
                    r.P.wrap(this._latestValue))
                : (t && this._subscribe(t),
                  (this._latestReturnedValue = this._latestValue),
                  this._latestValue);
            }
            _subscribe(t) {
              (this._obj = t),
                (this._strategy = this._selectStrategy(t)),
                (this._subscription = this._strategy.createSubscription(
                  t,
                  (e) => this._updateLatestValue(t, e)
                ));
            }
            _selectStrategy(e) {
              if (Object(r.qb)(e)) return U;
              if (Object(r.pb)(e)) return L;
              throw (
                ((n = t),
                Error(
                  `InvalidPipeArgument: '${e}' for pipe '${Object(r.ub)(n)}'`
                ))
              );
              var n;
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._latestReturnedValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(t, e) {
              t === this._obj &&
                ((this._latestValue = e), this._ref.markForCheck());
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Qb());
            }),
            (t.ɵpipe = r.Hb({ name: "async", type: t, pure: !1 })),
            t
          );
        })(),
        H = (() => {
          class t {
            transform(t) {
              return JSON.stringify(t, null, 2);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵpipe = r.Hb({ name: "json", type: t, pure: !1 })),
            t
          );
        })(),
        V = (() => {
          class t {}
          return (
            (t.ɵmod = r.Gb({ type: t })),
            (t.ɵinj = r.Fb({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: j, useClass: I }],
            })),
            t
          );
        })();
      const F = "browser";
      let $ = (() => {
        class t {}
        return (
          (t.ɵprov = Object(r.Eb)({
            token: t,
            providedIn: "root",
            factory: () => new z(Object(r.Ob)(c), window, Object(r.Ob)(r.m)),
          })),
          t
        );
      })();
      class z {
        constructor(t, e, n) {
          (this.document = t),
            (this.window = e),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportScrollRestoration()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportScrollRestoration() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (this.supportScrollRestoration()) {
            t =
              this.window.CSS && this.window.CSS.escape
                ? this.window.CSS.escape(t)
                : t.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
            try {
              const e = this.document.querySelector(`#${t}`);
              if (e) return void this.scrollToElement(e);
              const n = this.document.querySelector(`[name='${t}']`);
              if (n) return void this.scrollToElement(n);
            } catch (e) {
              this.errorHandler.handleError(e);
            }
          }
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        supportScrollRestoration() {
          try {
            return !!this.window && !!this.window.scrollTo;
          } catch (t) {
            return !1;
          }
        }
      }
    },
    quSY: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return a;
      });
      var r = n("DH7j"),
        s = n("XoHu"),
        i = n("n6bG");
      const o = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let a = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && (this._unsubscribe = t);
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _unsubscribe: a,
              _subscriptions: u,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (Object(i.a)(a))
              try {
                a.call(this);
              } catch (l) {
                e = l instanceof o ? c(l.errors) : [l];
              }
            if (Object(r.a)(u)) {
              let t = -1,
                n = u.length;
              for (; ++t < n; ) {
                const n = u[t];
                if (Object(s.a)(n))
                  try {
                    n.unsubscribe();
                  } catch (l) {
                    (e = e || []),
                      l instanceof o ? (e = e.concat(c(l.errors))) : e.push(l);
                  }
              }
            }
            if (e) throw new o(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: r } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof t) {
              if (r === this) return n;
              n._parentOrParents = [r, this];
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this);
            }
            const s = this._subscriptions;
            return null === s ? (this._subscriptions = [n]) : s.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        var e;
        return (t.EMPTY = (((e = new t()).closed = !0), e)), t;
      })();
      function c(t) {
        return t.reduce((t, e) => t.concat(e instanceof o ? e.errors : e), []);
      }
    },
    tyNb: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return _n;
      }),
        n.d(e, "b", function () {
          return Dn;
        }),
        n.d(e, "c", function () {
          return On;
        });
      var r = n("ofXK"),
        s = n("fXoL"),
        i = n("LRne"),
        o = n("Cfvw"),
        a = n("XNiG"),
        c = n("9ppp");
      class u extends a.a {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new c.a();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      var l = n("HDdC");
      const h = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      var d = n("itXk"),
        f = n("EY2u");
      function p(t) {
        return new l.a((e) => {
          let n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? Object(o.a)(n) : Object(f.b)()).subscribe(e);
        });
      }
      var g = n("lJxs"),
        m = n("0EUg"),
        b = n("7o/Q");
      function y(t, e) {
        return function (n) {
          return n.lift(new v(t, e));
        };
      }
      class v {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new w(t, this.predicate, this.thisArg));
        }
      }
      class w extends b.a {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      const _ = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function C(t) {
        return function (e) {
          return 0 === t ? Object(f.b)() : e.lift(new S(t));
        };
      }
      class S {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new _();
        }
        call(t, e) {
          return e.subscribe(new x(t, this.total));
        }
      }
      class x extends b.a {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : (e[r % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(r[s]);
            }
          }
          t.complete();
        }
      }
      function O(t = j) {
        return (e) => e.lift(new E(t));
      }
      class E {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new T(t, this.errorFactory));
        }
      }
      class T extends b.a {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function j() {
        return new h();
      }
      function I(t = null) {
        return (e) => e.lift(new A(t));
      }
      class A {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new k(t, this.defaultValue));
        }
      }
      class k extends b.a {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      var R = n("SpAZ");
      function N(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? y((e, n) => t(e, n, r)) : R.a,
            C(1),
            n ? I(e) : O(() => new h())
          );
      }
      var P = n("JIr8");
      function D(t) {
        return (e) => (0 === t ? Object(f.b)() : e.lift(new U(t)));
      }
      class U {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new _();
        }
        call(t, e) {
          return e.subscribe(new L(t, this.total));
        }
      }
      class L extends b.a {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function M(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? y((e, n) => t(e, n, r)) : R.a,
            D(1),
            n ? I(e) : O(() => new h())
          );
      }
      var H = n("5+tZ");
      class V {
        constructor(t, e, n) {
          (this.predicate = t), (this.thisArg = e), (this.source = n);
        }
        call(t, e) {
          return e.subscribe(
            new F(t, this.predicate, this.thisArg, this.source)
          );
        }
      }
      class F extends b.a {
        constructor(t, e, n, r) {
          super(t),
            (this.predicate = e),
            (this.thisArg = n),
            (this.source = r),
            (this.index = 0),
            (this.thisArg = n || this);
        }
        notifyComplete(t) {
          this.destination.next(t), this.destination.complete();
        }
        _next(t) {
          let e = !1;
          try {
            e = this.predicate.call(this.thisArg, t, this.index++, this.source);
          } catch (n) {
            return void this.destination.error(n);
          }
          e || this.notifyComplete(!1);
        }
        _complete() {
          this.notifyComplete(!0);
        }
      }
      var $ = n("eIep"),
        z = n("JX91");
      function q(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new B(t, e, n));
          }
        );
      }
      class B {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new Z(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class Z extends b.a {
        constructor(t, e, n, r) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function W(t, e) {
        return Object(H.a)(t, e, 1);
      }
      var G = n("mCNh");
      function Q() {}
      var J = n("n6bG");
      function Y(t, e, n) {
        return function (r) {
          return r.lift(new K(t, e, n));
        };
      }
      class K {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new X(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class X extends b.a {
        constructor(t, e, n, r) {
          super(t),
            (this._tapNext = Q),
            (this._tapError = Q),
            (this._tapComplete = Q),
            (this._tapError = n || Q),
            (this._tapComplete = r || Q),
            Object(J.a)(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || Q),
                (this._tapError = e.error || Q),
                (this._tapComplete = e.complete || Q));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      var tt = n("quSY");
      class et {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new nt(t, this.callback));
        }
      }
      class nt extends b.a {
        constructor(t, e) {
          super(t), this.add(new tt.a(e));
        }
      }
      var rt = n("bHdf");
      class st {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class it extends st {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ot extends st {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class at extends st {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ct extends st {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class ut extends st {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class lt extends st {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ht extends st {
        constructor(t, e, n, r, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class dt extends st {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ft extends st {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class pt {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class gt {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class mt {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class bt {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class yt {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class vt {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class wt {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let _t = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = s.Cb({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && s.Jb(0, "router-outlet");
            },
            directives: function () {
              return [On];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      class Ct {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return this.params.hasOwnProperty(t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function St(t) {
        return new Ct(t);
      }
      function xt(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function Ot(t, e, n) {
        const r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const e = r[i],
            n = t[i];
          if (e.startsWith(":")) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      class Et {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function Tt(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          jt(r, It(e, r));
        }
      }
      function jt(t, e) {
        if (!t)
          throw new Error(
            `\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(t))
          throw new Error(
            `Invalid configuration of route '${e}': Array cannot be specified`
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          "primary" !== t.outlet
        )
          throw new Error(
            `Invalid configuration of route '${e}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (t.redirectTo && t.children)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and children cannot be used together`
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and loadChildren cannot be used together`
          );
        if (t.children && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': children and loadChildren cannot be used together`
          );
        if (t.redirectTo && t.component)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and component cannot be used together`
          );
        if (t.path && t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': path and matcher cannot be used together`
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${e}': path cannot start with a slash`
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
          );
        t.children && Tt(t.children, e);
      }
      function It(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function At(t) {
        const e = t.children && t.children.map(At),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            "primary" !== n.outlet &&
            (n.component = _t),
          n
        );
      }
      function kt(t, e) {
        const n = Object.keys(t),
          r = Object.keys(e);
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++)
          if (((s = n[i]), !Rt(t[s], e[s]))) return !1;
        return !0;
      }
      function Rt(t, e) {
        return Array.isArray(t) && Array.isArray(e)
          ? t.length == e.length && t.every((t) => e.indexOf(t) > -1)
          : t === e;
      }
      function Nt(t) {
        return Array.prototype.concat.apply([], t);
      }
      function Pt(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Dt(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Ut(t) {
        return Object(s.pb)(t)
          ? t
          : Object(s.qb)(t)
          ? Object(o.a)(Promise.resolve(t))
          : Object(i.a)(t);
      }
      function Lt(t, e, n) {
        return n
          ? (function (t, e) {
              return kt(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!Ft(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const r in n.children) {
                  if (!e.children[r]) return !1;
                  if (!t(e.children[r], n.children[r])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => Rt(t[n], e[n]))
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, r, s) {
                  if (n.segments.length > s.length)
                    return (
                      !!Ft(n.segments.slice(0, s.length), s) && !r.hasChildren()
                    );
                  if (n.segments.length === s.length) {
                    if (!Ft(n.segments, s)) return !1;
                    for (const e in r.children) {
                      if (!n.children[e]) return !1;
                      if (!t(n.children[e], r.children[e])) return !1;
                    }
                    return !0;
                  }
                  {
                    const t = s.slice(0, n.segments.length),
                      i = s.slice(n.segments.length);
                    return (
                      !!Ft(n.segments, t) &&
                      !!n.children.primary &&
                      e(n.children.primary, r, i)
                    );
                  }
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      class Mt {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = St(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Bt.serialize(this);
        }
      }
      class Ht {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            Dt(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Zt(this);
        }
      }
      class Vt {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = St(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Kt(this);
        }
      }
      function Ft(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      function $t(t, e) {
        let n = [];
        return (
          Dt(t.children, (t, r) => {
            "primary" === r && (n = n.concat(e(t, r)));
          }),
          Dt(t.children, (t, r) => {
            "primary" !== r && (n = n.concat(e(t, r)));
          }),
          n
        );
      }
      class zt {}
      class qt {
        parse(t) {
          const e = new re(t);
          return new Mt(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          var e;
          return `${`/${(function t(e, n) {
            if (!e.hasChildren()) return Zt(e);
            if (n) {
              const n = e.children.primary ? t(e.children.primary, !1) : "",
                r = [];
              return (
                Dt(e.children, (e, n) => {
                  "primary" !== n && r.push(`${n}:${t(e, !1)}`);
                }),
                r.length > 0 ? `${n}(${r.join("//")})` : n
              );
            }
            {
              const n = $t(e, (n, r) =>
                "primary" === r
                  ? [t(e.children.primary, !1)]
                  : [`${r}:${t(n, !1)}`]
              );
              return `${Zt(e)}/(${n.join("//")})`;
            }
          })(t.root, !0)}`}${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${Gt(e)}=${Gt(t)}`).join("&")
                : `${Gt(e)}=${Gt(n)}`;
            });
            return e.length ? `?${e.join("&")}` : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment
              ? `#${((e = t.fragment), encodeURI(e))}`
              : ""
          }`;
        }
      }
      const Bt = new qt();
      function Zt(t) {
        return t.segments.map((t) => Kt(t)).join("/");
      }
      function Wt(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Gt(t) {
        return Wt(t).replace(/%3B/gi, ";");
      }
      function Qt(t) {
        return Wt(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Jt(t) {
        return decodeURIComponent(t);
      }
      function Yt(t) {
        return Jt(t.replace(/\+/g, "%20"));
      }
      function Kt(t) {
        return `${Qt(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${Qt(t)}=${Qt(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const Xt = /^[^\/()?;=#]+/;
      function te(t) {
        const e = t.match(Xt);
        return e ? e[0] : "";
      }
      const ee = /^[^=?&#]+/,
        ne = /^[^?&#]+/;
      class re {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Ht([], {})
              : new Ht([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new Ht(t, e)),
            n
          );
        }
        parseSegment() {
          const t = te(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Vt(Jt(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = te(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = te(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[Jt(e)] = Jt(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(ee);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(ne);
              return e ? e[0] : "";
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const r = Yt(e),
            s = Yt(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = te(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = "primary");
            const i = this.parseChildren();
            (e[s] = 1 === Object.keys(i).length ? i.primary : new Ht([], i)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class se {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = ie(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = ie(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = oe(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return oe(t, this._root).map((t) => t.value);
        }
      }
      function ie(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = ie(t, n);
          if (e) return e;
        }
        return null;
      }
      function oe(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = oe(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class ae {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function ce(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class ue extends se {
        constructor(t, e) {
          super(t), (this.snapshot = e), ge(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function le(t, e) {
        const n = (function (t, e) {
            const n = new fe(
              [],
              {},
              {},
              "",
              {},
              "primary",
              e,
              null,
              t.root,
              -1,
              {}
            );
            return new pe("", new ae(n, []));
          })(t, e),
          r = new u([new Vt("", {})]),
          s = new u({}),
          i = new u({}),
          o = new u({}),
          a = new u(""),
          c = new he(r, s, o, a, i, "primary", e, n.root);
        return (c.snapshot = n.root), new ue(new ae(c, []), n);
      }
      class he {
        constructor(t, e, n, r, s, i, o, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(Object(g.a)((t) => St(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(
                Object(g.a)((t) => St(t))
              )),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function de(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && "" === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class fe {
        constructor(t, e, n, r, s, i, o, a, c, u, l) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = c),
            (this._lastPathIndex = u),
            (this._resolve = l);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = St(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = St(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class pe extends se {
        constructor(t, e) {
          super(e), (this.url = t), ge(this, e);
        }
        toString() {
          return me(this._root);
        }
      }
      function ge(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => ge(t, e));
      }
      function me(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(me).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function be(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            kt(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            kt(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!kt(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            kt(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function ye(t, e) {
        var n, r;
        return (
          kt(t.params, e.params) &&
          Ft((n = t.url), (r = e.url)) &&
          n.every((t, e) => kt(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || ye(t.parent, e.parent))
        );
      }
      function ve(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function we(t, e, n, r, s) {
        let i = {};
        return (
          r &&
            Dt(r, (t, e) => {
              i[e] = Array.isArray(t) ? t.map((t) => `${t}`) : `${t}`;
            }),
          new Mt(
            n.root === t
              ? e
              : (function t(e, n, r) {
                  const s = {};
                  return (
                    Dt(e.children, (e, i) => {
                      s[i] = e === n ? r : t(e, n, r);
                    }),
                    new Ht(e.segments, s)
                  );
                })(n.root, t, e),
            i,
            s
          )
        );
      }
      class _e {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && ve(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(
            (t) => "object" == typeof t && null != t && t.outlets
          );
          if (r && r !== Pt(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Ce {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function Se(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets.primary
          : `${t}`;
      }
      function xe(t, e, n) {
        if (
          (t || (t = new Ht([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return Oe(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i;
              const e = t.segments[s],
                o = Se(n[r]),
                a = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === o) break;
              if (o && a && "object" == typeof a && void 0 === a.outlets) {
                if (!Ie(o, a, e)) return i;
                r += 2;
              } else {
                if (!Ie(o, {}, e)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new Ht(t.segments.slice(0, r.pathIndex), {});
          return (
            (e.children.primary = new Ht(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            Oe(e, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new Ht(t.segments, {})
          : r.match && !t.hasChildren()
          ? Ee(t, e, n)
          : r.match
          ? Oe(t, 0, s)
          : Ee(t, e, n);
      }
      function Oe(t, e, n) {
        if (0 === n.length) return new Ht(t.segments, {});
        {
          const r = (function (t) {
              return "object" != typeof t[0] || void 0 === t[0].outlets
                ? { primary: t }
                : t[0].outlets;
            })(n),
            s = {};
          return (
            Dt(r, (n, r) => {
              null !== n && (s[r] = xe(t.children[r], e, n));
            }),
            Dt(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t);
            }),
            new Ht(t.segments, s)
          );
        }
      }
      function Ee(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          if ("object" == typeof n[s] && void 0 !== n[s].outlets) {
            const t = Te(n[s].outlets);
            return new Ht(r, t);
          }
          if (0 === s && ve(n[0])) {
            r.push(new Vt(t.segments[e].path, n[0])), s++;
            continue;
          }
          const i = Se(n[s]),
            o = s < n.length - 1 ? n[s + 1] : null;
          i && o && ve(o)
            ? (r.push(new Vt(i, je(o))), (s += 2))
            : (r.push(new Vt(i, {})), s++);
        }
        return new Ht(r, {});
      }
      function Te(t) {
        const e = {};
        return (
          Dt(t, (t, n) => {
            null !== t && (e[n] = Ee(new Ht([], {}), 0, t));
          }),
          e
        );
      }
      function je(t) {
        const e = {};
        return Dt(t, (t, n) => (e[n] = `${t}`)), e;
      }
      function Ie(t, e, n) {
        return t == n.path && kt(e, n.parameters);
      }
      class Ae {
        constructor(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            be(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const r = ce(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e];
          }),
            Dt(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n) {
            const r = ce(t),
              s = t.value.component ? n.children : e;
            Dt(r, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(t, e, n) {
          const r = ce(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, r[t.value.outlet], n),
              this.forwardEvent(new vt(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new bt(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if ((be(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                ke(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function ke(t) {
        be(t.value), t.children.forEach(ke);
      }
      function Re(t) {
        return "function" == typeof t;
      }
      function Ne(t) {
        return t instanceof Mt;
      }
      class Pe {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class De {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Ue(t) {
        return new l.a((e) => e.error(new Pe(t)));
      }
      function Le(t) {
        return new l.a((e) => e.error(new De(t)));
      }
      function Me(t) {
        return new l.a((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class He {
        constructor(t, e, n, r, i) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = i),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(s.x));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            "primary"
          )
            .pipe(
              Object(g.a)((t) =>
                this.createUrlTree(
                  t,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Object(P.a)((t) => {
                if (t instanceof De)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof Pe) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            t.root,
            "primary"
          )
            .pipe(
              Object(g.a)((e) =>
                this.createUrlTree(e, t.queryParams, t.fragment)
              )
            )
            .pipe(
              Object(P.a)((t) => {
                if (t instanceof Pe) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new Ht([], { primary: t }) : t;
          return new Mt(r, e, n);
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(
                Object(g.a)((t) => new Ht([], t))
              )
            : this.expandSegment(t, n, e, n.segments, r, !0);
        }
        expandChildren(t, e, n) {
          return (function (t, e) {
            if (0 === Object.keys(t).length) return Object(i.a)({});
            const n = [],
              r = [],
              s = {};
            return (
              Dt(t, (t, i) => {
                const o = e(i, t).pipe(Object(g.a)((t) => (s[i] = t)));
                "primary" === i ? n.push(o) : r.push(o);
              }),
              i.a.apply(null, n.concat(r)).pipe(
                Object(m.a)(),
                N(),
                Object(g.a)(() => s)
              )
            );
          })(n.children, (n, r) => this.expandSegmentGroup(t, e, r, n));
        }
        expandSegment(t, e, n, r, s, o) {
          return Object(i.a)(...n).pipe(
            Object(g.a)((a) =>
              this.expandSegmentAgainstRoute(t, e, n, a, r, s, o).pipe(
                Object(P.a)((t) => {
                  if (t instanceof Pe) return Object(i.a)(null);
                  throw t;
                })
              )
            ),
            Object(m.a)(),
            M((t) => !!t),
            Object(P.a)((t, n) => {
              if (t instanceof h || "EmptyError" === t.name) {
                if (this.noLeftoversInUrl(e, r, s))
                  return Object(i.a)(new Ht([], {}));
                throw new Pe(e);
              }
              throw t;
            })
          );
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
          return ze(r) !== i
            ? Ue(e)
            : void 0 === r.redirectTo
            ? this.matchSegmentAgainstRoute(t, e, r, s)
            : o && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
            : Ue(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                r,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? Le(s)
            : this.lineralizeSegments(n, s).pipe(
                Object(H.a)((n) => {
                  const s = new Ht(n, {});
                  return this.expandSegment(t, s, e, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: c,
            positionalParamSegments: u,
          } = Ve(e, r, s);
          if (!o) return Ue(e);
          const l = this.applyRedirectCommands(a, r.redirectTo, u);
          return r.redirectTo.startsWith("/")
            ? Le(l)
            : this.lineralizeSegments(r, l).pipe(
                Object(H.a)((r) =>
                  this.expandSegment(t, e, n, r.concat(s.slice(c)), i, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, r) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(
                    Object(g.a)((t) => ((n._loadedConfig = t), new Ht(r, {})))
                  )
              : Object(i.a)(new Ht(r, {}));
          const { matched: s, consumedSegments: o, lastChild: a } = Ve(e, n, r);
          if (!s) return Ue(e);
          const c = r.slice(a);
          return this.getChildConfig(t, n, r).pipe(
            Object(H.a)((t) => {
              const n = t.module,
                r = t.routes,
                { segmentGroup: s, slicedSegments: a } = (function (
                  t,
                  e,
                  n,
                  r
                ) {
                  return n.length > 0 &&
                    (function (t, e, n) {
                      return n.some((n) => $e(t, e, n) && "primary" !== ze(n));
                    })(t, n, r)
                    ? {
                        segmentGroup: Fe(
                          new Ht(
                            e,
                            (function (t, e) {
                              const n = {};
                              n.primary = e;
                              for (const r of t)
                                "" === r.path &&
                                  "primary" !== ze(r) &&
                                  (n[ze(r)] = new Ht([], {}));
                              return n;
                            })(r, new Ht(n, t.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (t, e, n) {
                        return n.some((n) => $e(t, e, n));
                      })(t, n, r)
                    ? {
                        segmentGroup: Fe(
                          new Ht(
                            t.segments,
                            (function (t, e, n, r) {
                              const s = {};
                              for (const i of n)
                                $e(t, e, i) &&
                                  !r[ze(i)] &&
                                  (s[ze(i)] = new Ht([], {}));
                              return Object.assign(Object.assign({}, r), s);
                            })(t, n, r, t.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: t, slicedSegments: n };
                })(e, o, c, r);
              return 0 === a.length && s.hasChildren()
                ? this.expandChildren(n, r, s).pipe(
                    Object(g.a)((t) => new Ht(o, t))
                  )
                : 0 === r.length && 0 === a.length
                ? Object(i.a)(new Ht(o, {}))
                : this.expandSegment(n, s, r, a, "primary", !0).pipe(
                    Object(g.a)((t) => new Ht(o.concat(t.segments), t.children))
                  );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? Object(i.a)(new Et(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? Object(i.a)(e._loadedConfig)
              : (function (t, e, n) {
                  const r = e.canLoad;
                  return r && 0 !== r.length
                    ? Object(o.a)(r)
                        .pipe(
                          Object(g.a)((r) => {
                            const s = t.get(r);
                            let i;
                            if (
                              (function (t) {
                                return t && Re(t.canLoad);
                              })(s)
                            )
                              i = s.canLoad(e, n);
                            else {
                              if (!Re(s))
                                throw new Error("Invalid CanLoad guard");
                              i = s(e, n);
                            }
                            return Ut(i);
                          })
                        )
                        .pipe(
                          Object(m.a)(),
                          ((s = (t) => !0 === t),
                          (t) => t.lift(new V(s, void 0, t)))
                        )
                    : Object(i.a)(!0);
                  var s;
                })(t.injector, e, n).pipe(
                  Object(H.a)((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(Object(g.a)((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new l.a((e) =>
                            e.error(
                              xt(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : Object(i.a)(new Et([], t));
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return Object(i.a)(n);
            if (r.numberOfChildren > 1 || !r.children.primary)
              return Me(t.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r);
          return new Mt(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            Dt(t, (t, r) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[r] = e[s];
              } else n[r] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r);
          let i = {};
          return (
            Dt(e.children, (e, s) => {
              i[s] = this.createSegmentGroup(t, e, n, r);
            }),
            new Ht(s, i)
          );
        }
        createSegments(t, e, n, r) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, r)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return r;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++;
          }
          return t;
        }
      }
      function Ve(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        const r = (e.matcher || Ot)(n, t, e);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function Fe(t) {
        if (1 === t.numberOfChildren && t.children.primary) {
          const e = t.children.primary;
          return new Ht(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function $e(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function ze(t) {
        return t.outlet || "primary";
      }
      class qe {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Be {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function Ze(t, e, n) {
        const r = t._root;
        return (function t(
          e,
          n,
          r,
          s,
          i = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const o = ce(n);
          return (
            e.children.forEach((e) => {
              !(function (
                e,
                n,
                r,
                s,
                i = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const o = e.value,
                  a = n ? n.value : null,
                  c = r ? r.getContext(e.value.outlet) : null;
                if (a && o.routeConfig === a.routeConfig) {
                  const u = (function (t, e, n) {
                    if ("function" == typeof n) return n(t, e);
                    switch (n) {
                      case "pathParamsChange":
                        return !Ft(t.url, e.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !Ft(t.url, e.url) || !kt(t.queryParams, e.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !ye(t, e) || !kt(t.queryParams, e.queryParams);
                      case "paramsChange":
                      default:
                        return !ye(t, e);
                    }
                  })(a, o, o.routeConfig.runGuardsAndResolvers);
                  u
                    ? i.canActivateChecks.push(new qe(s))
                    : ((o.data = a.data), (o._resolvedData = a._resolvedData)),
                    t(e, n, o.component ? (c ? c.children : null) : r, s, i),
                    u &&
                      i.canDeactivateChecks.push(
                        new Be((c && c.outlet && c.outlet.component) || null, a)
                      );
                } else
                  a && Ge(n, c, i),
                    i.canActivateChecks.push(new qe(s)),
                    t(e, null, o.component ? (c ? c.children : null) : r, s, i);
              })(e, o[e.value.outlet], r, s.concat([e.value]), i),
                delete o[e.value.outlet];
            }),
            Dt(o, (t, e) => Ge(t, r.getContext(e), i)),
            i
          );
        })(r, e ? e._root : null, n, [r.value]);
      }
      function We(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function Ge(t, e, n) {
        const r = ce(t),
          s = t.value;
        Dt(r, (t, r) => {
          Ge(t, s.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new Be(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      const Qe = Symbol("INITIAL_VALUE");
      function Je() {
        return Object($.a)((t) =>
          Object(d.a)(...t.map((t) => t.pipe(D(1), Object(z.a)(Qe)))).pipe(
            q((t, e) => {
              let n = !1;
              return e.reduce((t, r, s) => {
                if (t !== Qe) return t;
                if ((r === Qe && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === e.length - 1 || Ne(r)) return r;
                }
                return t;
              }, t);
            }, Qe),
            y((t) => t !== Qe),
            Object(g.a)((t) => (Ne(t) ? t : !0 === t)),
            D(1)
          )
        );
      }
      function Ye(t, e) {
        return null !== t && e && e(new yt(t)), Object(i.a)(!0);
      }
      function Ke(t, e) {
        return null !== t && e && e(new mt(t)), Object(i.a)(!0);
      }
      function Xe(t, e, n) {
        const r = e.routeConfig ? e.routeConfig.canActivate : null;
        if (!r || 0 === r.length) return Object(i.a)(!0);
        const s = r.map((r) =>
          p(() => {
            const s = We(r, e, n);
            let i;
            if (
              (function (t) {
                return t && Re(t.canActivate);
              })(s)
            )
              i = Ut(s.canActivate(e, t));
            else {
              if (!Re(s)) throw new Error("Invalid CanActivate guard");
              i = Ut(s(e, t));
            }
            return i.pipe(M());
          })
        );
        return Object(i.a)(s).pipe(Je());
      }
      function tn(t, e, n) {
        const r = e[e.length - 1],
          s = e
            .slice(0, e.length - 1)
            .reverse()
            .map((t) =>
              (function (t) {
                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t)
            )
            .filter((t) => null !== t)
            .map((e) =>
              p(() => {
                const s = e.guards.map((s) => {
                  const i = We(s, e.node, n);
                  let o;
                  if (
                    (function (t) {
                      return t && Re(t.canActivateChild);
                    })(i)
                  )
                    o = Ut(i.canActivateChild(r, t));
                  else {
                    if (!Re(i))
                      throw new Error("Invalid CanActivateChild guard");
                    o = Ut(i(r, t));
                  }
                  return o.pipe(M());
                });
                return Object(i.a)(s).pipe(Je());
              })
            );
        return Object(i.a)(s).pipe(Je());
      }
      class en {}
      class nn {
        constructor(t, e, n, r, s, i) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          try {
            const t = on(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              e = this.processSegmentGroup(this.config, t, "primary"),
              n = new fe(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                "primary",
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              r = new ae(n, e),
              s = new pe(this.url, r);
            return this.inheritParamsAndData(s._root), Object(i.a)(s);
          } catch (t) {
            return new l.a((e) => e.error(t));
          }
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = de(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = $t(e, (e, n) => this.processSegmentGroup(t, e, n));
          return (
            (function (t) {
              const e = {};
              t.forEach((t) => {
                const n = e[t.value.outlet];
                if (n) {
                  const e = n.url.map((t) => t.toString()).join("/"),
                    r = t.value.url.map((t) => t.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${e}' and '${r}'.`
                  );
                }
                e[t.value.outlet] = t.value;
              });
            })(n),
            n.sort((t, e) =>
              "primary" === t.value.outlet
                ? -1
                : "primary" === e.value.outlet
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            n
          );
        }
        processSegment(t, e, n, r) {
          for (const i of t)
            try {
              return this.processSegmentAgainstRoute(i, e, n, r);
            } catch (s) {
              if (!(s instanceof en)) throw s;
            }
          if (this.noLeftoversInUrl(e, n, r)) return [];
          throw new en();
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo) throw new en();
          if ((t.outlet || "primary") !== r) throw new en();
          let s,
            i = [],
            o = [];
          if ("**" === t.path) {
            const i = n.length > 0 ? Pt(n).parameters : {};
            s = new fe(
              n,
              i,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              un(t),
              r,
              t.component,
              t,
              rn(e),
              sn(e) + n.length,
              ln(t)
            );
          } else {
            const a = (function (t, e, n) {
              if ("" === e.path) {
                if ("full" === e.pathMatch && (t.hasChildren() || n.length > 0))
                  throw new en();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const r = (e.matcher || Ot)(n, t, e);
              if (!r) throw new en();
              const s = {};
              Dt(r.posParams, (t, e) => {
                s[e] = t.path;
              });
              const i =
                r.consumed.length > 0
                  ? Object.assign(
                      Object.assign({}, s),
                      r.consumed[r.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: r.consumed,
                lastChild: r.consumed.length,
                parameters: i,
              };
            })(e, t, n);
            (i = a.consumedSegments),
              (o = n.slice(a.lastChild)),
              (s = new fe(
                i,
                a.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                un(t),
                r,
                t.component,
                t,
                rn(e),
                sn(e) + i.length,
                ln(t)
              ));
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: c, slicedSegments: u } = on(
              e,
              i,
              o,
              a,
              this.relativeLinkResolution
            );
          if (0 === u.length && c.hasChildren()) {
            const t = this.processChildren(a, c);
            return [new ae(s, t)];
          }
          if (0 === a.length && 0 === u.length) return [new ae(s, [])];
          const l = this.processSegment(a, c, u, "primary");
          return [new ae(s, l)];
        }
      }
      function rn(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function sn(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function on(t, e, n, r, s) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => an(t, e, n) && "primary" !== cn(n));
          })(t, n, r)
        ) {
          const s = new Ht(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s.primary = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const i of n)
                if ("" === i.path && "primary" !== cn(i)) {
                  const n = new Ht([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[cn(i)] = n);
                }
              return s;
            })(t, e, r, new Ht(n, t.children))
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => an(t, e, n));
          })(t, n, r)
        ) {
          const i = new Ht(
            t.segments,
            (function (t, e, n, r, s, i) {
              const o = {};
              for (const a of r)
                if (an(t, n, a) && !s[cn(a)]) {
                  const n = new Ht([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === i ? t.segments.length : e.length),
                    (o[cn(a)] = n);
                }
              return Object.assign(Object.assign({}, s), o);
            })(t, e, n, r, t.children, s)
          );
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const i = new Ht(t.segments, t.children);
        return (
          (i._sourceSegment = t),
          (i._segmentIndexShift = e.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function an(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function cn(t) {
        return t.outlet || "primary";
      }
      function un(t) {
        return t.data || {};
      }
      function ln(t) {
        return t.resolve || {};
      }
      function hn(t, e, n, r) {
        const s = We(t, e, r);
        return Ut(s.resolve ? s.resolve(e, n) : s(e, n));
      }
      function dn(t) {
        return function (e) {
          return e.pipe(
            Object($.a)((e) => {
              const n = t(e);
              return n
                ? Object(o.a)(n).pipe(Object(g.a)(() => e))
                : Object(o.a)([e]);
            })
          );
        };
      }
      class fn {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      }
      const pn = new s.q("ROUTES");
      class gn {
        constructor(t, e, n, r) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              Object(g.a)((n) => {
                this.onLoadEndListener && this.onLoadEndListener(e);
                const r = n.create(t);
                return new Et(Nt(r.injector.get(pn)).map(At), r);
              })
            )
          );
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? Object(o.a)(this.loader.load(t))
            : Ut(t()).pipe(
                Object(H.a)((t) =>
                  t instanceof s.v
                    ? Object(i.a)(t)
                    : Object(o.a)(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class mn {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function bn(t) {
        throw t;
      }
      function yn(t, e, n) {
        return e.parse("/");
      }
      function vn(t, e) {
        return Object(i.a)(null);
      }
      let wn = (() => {
          class t {
            constructor(t, e, n, r, i, o, c, l) {
              (this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = r),
                (this.config = l),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.navigationId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new a.a()),
                (this.errorHandler = bn),
                (this.malformedUriErrorHandler = yn),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: vn,
                  afterPreactivation: vn,
                }),
                (this.urlHandlingStrategy = new mn()),
                (this.routeReuseStrategy = new fn()),
                (this.onSameUrlNavigation = "ignore"),
                (this.paramsInheritanceStrategy = "emptyOnly"),
                (this.urlUpdateStrategy = "deferred"),
                (this.relativeLinkResolution = "legacy"),
                (this.ngModule = i.get(s.x)),
                (this.console = i.get(s.W));
              const h = i.get(s.z);
              (this.isNgZoneEnabled = h instanceof s.z),
                this.resetConfig(l),
                (this.currentUrlTree = new Mt(new Ht([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new gn(
                  o,
                  c,
                  (t) => this.triggerEvent(new pt(t)),
                  (t) => this.triggerEvent(new gt(t))
                )),
                (this.routerState = le(
                  this.currentUrlTree,
                  this.rootComponentType
                )),
                (this.transitions = new u({
                  id: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: "imperative",
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations();
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(
                y((t) => 0 !== t.id),
                Object(g.a)((t) =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  })
                ),
                Object($.a)((t) => {
                  let n = !1,
                    r = !1;
                  return Object(i.a)(t).pipe(
                    Y((t) => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null }
                            )
                          : null,
                      };
                    }),
                    Object($.a)((t) => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString();
                      if (
                        ("reload" === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return Object(i.a)(t).pipe(
                          Object($.a)((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(
                                new it(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              n !== this.transitions.getValue() ? f.a : [t]
                            );
                          }),
                          Object($.a)((t) => Promise.resolve(t)),
                          ((r = this.ngModule.injector),
                          (s = this.configLoader),
                          (o = this.urlSerializer),
                          (a = this.config),
                          function (t) {
                            return t.pipe(
                              Object($.a)((t) =>
                                (function (t, e, n, r, s) {
                                  return new He(t, e, n, r, s).apply();
                                })(r, s, o, t.extractedUrl, a).pipe(
                                  Object(g.a)((e) =>
                                    Object.assign(Object.assign({}, t), {
                                      urlAfterRedirects: e,
                                    })
                                  )
                                )
                              )
                            );
                          }),
                          Y((t) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, r, s) {
                            return function (i) {
                              return i.pipe(
                                Object(H.a)((i) =>
                                  (function (
                                    t,
                                    e,
                                    n,
                                    r,
                                    s = "emptyOnly",
                                    i = "legacy"
                                  ) {
                                    return new nn(t, e, n, r, s, i).recognize();
                                  })(
                                    t,
                                    e,
                                    i.urlAfterRedirects,
                                    n(i.urlAfterRedirects),
                                    r,
                                    s
                                  ).pipe(
                                    Object(g.a)((t) =>
                                      Object.assign(Object.assign({}, i), {
                                        targetSnapshot: t,
                                      })
                                    )
                                  )
                                )
                              );
                            };
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Y((t) => {
                            "eager" === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (this.browserUrlTree = t.urlAfterRedirects));
                          }),
                          Y((t) => {
                            const n = new ut(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        );
                      var r, s, o, a;
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: r,
                            source: s,
                            restoredState: o,
                            extras: a,
                          } = t,
                          c = new it(n, this.serializeUrl(r), s, o);
                        e.next(c);
                        const u = le(r, this.rootComponentType).snapshot;
                        return Object(i.a)(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: u,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, a), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        f.a
                      );
                    }),
                    dn((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    Y((t) => {
                      const e = new lt(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      this.triggerEvent(e);
                    }),
                    Object(g.a)((t) =>
                      Object.assign(Object.assign({}, t), {
                        guards: Ze(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                    ),
                    (function (t, e) {
                      return function (n) {
                        return n.pipe(
                          Object(H.a)((n) => {
                            const {
                              targetSnapshot: r,
                              currentSnapshot: s,
                              guards: {
                                canActivateChecks: a,
                                canDeactivateChecks: c,
                              },
                            } = n;
                            return 0 === c.length && 0 === a.length
                              ? Object(i.a)(
                                  Object.assign(Object.assign({}, n), {
                                    guardsResult: !0,
                                  })
                                )
                              : (function (t, e, n, r) {
                                  return Object(o.a)(t).pipe(
                                    Object(H.a)((t) =>
                                      (function (t, e, n, r, s) {
                                        const o =
                                          e && e.routeConfig
                                            ? e.routeConfig.canDeactivate
                                            : null;
                                        if (!o || 0 === o.length)
                                          return Object(i.a)(!0);
                                        const a = o.map((i) => {
                                          const o = We(i, e, s);
                                          let a;
                                          if (
                                            (function (t) {
                                              return t && Re(t.canDeactivate);
                                            })(o)
                                          )
                                            a = Ut(o.canDeactivate(t, e, n, r));
                                          else {
                                            if (!Re(o))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            a = Ut(o(t, e, n, r));
                                          }
                                          return a.pipe(M());
                                        });
                                        return Object(i.a)(a).pipe(Je());
                                      })(t.component, t.route, n, e, r)
                                    ),
                                    M((t) => !0 !== t, !0)
                                  );
                                })(c, r, s, t).pipe(
                                  Object(H.a)((n) =>
                                    n && "boolean" == typeof n
                                      ? (function (t, e, n, r) {
                                          return Object(o.a)(e).pipe(
                                            W((e) =>
                                              Object(o.a)([
                                                Ke(e.route.parent, r),
                                                Ye(e.route, r),
                                                tn(t, e.path, n),
                                                Xe(t, e.route, n),
                                              ]).pipe(
                                                Object(m.a)(),
                                                M((t) => !0 !== t, !0)
                                              )
                                            ),
                                            M((t) => !0 !== t, !0)
                                          );
                                        })(r, a, t, e)
                                      : Object(i.a)(n)
                                  ),
                                  Object(g.a)((t) =>
                                    Object.assign(Object.assign({}, n), {
                                      guardsResult: t,
                                    })
                                  )
                                );
                          })
                        );
                      };
                    })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                    Y((t) => {
                      if (Ne(t.guardsResult)) {
                        const e = xt(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult
                          )}"`
                        );
                        throw ((e.url = t.guardsResult), e);
                      }
                    }),
                    Y((t) => {
                      const e = new ht(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      this.triggerEvent(e);
                    }),
                    y((t) => {
                      if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new at(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return e.next(n), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    dn((t) => {
                      if (t.guards.canActivateChecks.length)
                        return Object(i.a)(t).pipe(
                          Y((t) => {
                            const e = new dt(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          }),
                          ((e = this.paramsInheritanceStrategy),
                          (n = this.ngModule.injector),
                          function (t) {
                            return t.pipe(
                              Object(H.a)((t) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: s },
                                } = t;
                                return s.length
                                  ? Object(o.a)(s).pipe(
                                      W((t) =>
                                        (function (t, e, n, r) {
                                          return (function (t, e, n, r) {
                                            const s = Object.keys(t);
                                            if (0 === s.length)
                                              return Object(i.a)({});
                                            if (1 === s.length) {
                                              const i = s[0];
                                              return hn(t[i], e, n, r).pipe(
                                                Object(g.a)((t) => ({ [i]: t }))
                                              );
                                            }
                                            const a = {};
                                            return Object(o.a)(s)
                                              .pipe(
                                                Object(H.a)((s) =>
                                                  hn(t[s], e, n, r).pipe(
                                                    Object(g.a)(
                                                      (t) => ((a[s] = t), t)
                                                    )
                                                  )
                                                )
                                              )
                                              .pipe(
                                                N(),
                                                Object(g.a)(() => a)
                                              );
                                          })(t._resolve, t, e, r).pipe(
                                            Object(g.a)(
                                              (e) => (
                                                (t._resolvedData = e),
                                                (t.data = Object.assign(
                                                  Object.assign({}, t.data),
                                                  de(t, n).resolve
                                                )),
                                                null
                                              )
                                            )
                                          );
                                        })(t.route, r, e, n)
                                      ),
                                      (function (t, e) {
                                        return arguments.length >= 2
                                          ? function (n) {
                                              return Object(G.a)(
                                                q(t, e),
                                                C(1),
                                                I(e)
                                              )(n);
                                            }
                                          : function (e) {
                                              return Object(G.a)(
                                                q((e, n, r) => t(e, n, r + 1)),
                                                C(1)
                                              )(e);
                                            };
                                      })((t, e) => t),
                                      Object(g.a)((e) => t)
                                    )
                                  : Object(i.a)(t);
                              })
                            );
                          }),
                          Y((t) => {
                            const e = new ft(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          })
                        );
                      var e, n;
                    }),
                    dn((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    Object(g.a)((t) => {
                      const e = (function (t, e, n) {
                        const r = (function t(e, n, r) {
                          if (
                            r &&
                            e.shouldReuseRoute(n.value, r.value.snapshot)
                          ) {
                            const s = r.value;
                            s._futureSnapshot = n.value;
                            const i = (function (e, n, r) {
                              return n.children.map((n) => {
                                for (const s of r.children)
                                  if (
                                    e.shouldReuseRoute(
                                      s.value.snapshot,
                                      n.value
                                    )
                                  )
                                    return t(e, n, s);
                                return t(e, n);
                              });
                            })(e, n, r);
                            return new ae(s, i);
                          }
                          {
                            const r = e.retrieve(n.value);
                            if (r) {
                              const t = r.route;
                              return (
                                (function t(e, n) {
                                  if (
                                    e.value.routeConfig !== n.value.routeConfig
                                  )
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                    );
                                  if (e.children.length !== n.children.length)
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                    );
                                  n.value._futureSnapshot = e.value;
                                  for (let r = 0; r < e.children.length; ++r)
                                    t(e.children[r], n.children[r]);
                                })(n, t),
                                t
                              );
                            }
                            {
                              const r = new he(
                                  new u((s = n.value).url),
                                  new u(s.params),
                                  new u(s.queryParams),
                                  new u(s.fragment),
                                  new u(s.data),
                                  s.outlet,
                                  s.component,
                                  s
                                ),
                                i = n.children.map((n) => t(e, n));
                              return new ae(r, i);
                            }
                          }
                          var s;
                        })(t, e._root, n ? n._root : void 0);
                        return new ue(r, e);
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState
                      );
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      });
                    }),
                    Y((t) => {
                      (this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl
                        )),
                        (this.routerState = t.targetRouterState),
                        "deferred" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              this.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((a = this.rootContexts),
                    (c = this.routeReuseStrategy),
                    (l = (t) => this.triggerEvent(t)),
                    Object(g.a)(
                      (t) => (
                        new Ae(
                          c,
                          t.targetRouterState,
                          t.currentRouterState,
                          l
                        ).activate(a),
                        t
                      )
                    )),
                    Y({
                      next() {
                        n = !0;
                      },
                      complete() {
                        n = !0;
                      },
                    }),
                    ((s = () => {
                      if (!n && !r) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new at(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        );
                        e.next(n), t.resolve(!1);
                      }
                      this.currentNavigation = null;
                    }),
                    (t) => t.lift(new et(s))),
                    Object(P.a)((n) => {
                      if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const r = Ne(n.url);
                        r ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        const s = new at(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message
                        );
                        e.next(s),
                          r
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree
                                );
                                return this.scheduleNavigation(
                                  e,
                                  "imperative",
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      "eager" === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  }
                                );
                              }, 0)
                            : t.resolve(!1);
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        const r = new ct(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n
                        );
                        e.next(r);
                        try {
                          t.resolve(this.errorHandler(n));
                        } catch (i) {
                          t.reject(i);
                        }
                      }
                      var s;
                      return f.a;
                    })
                  );
                  var s, a, c, l;
                })
              );
            }
            resetRootComponentType(t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }
            getTransition() {
              const t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t)
              );
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  let e = this.parseUrl(t.url);
                  const n = "popstate" === t.type ? "popstate" : "hashchange",
                    r = t.state && t.state.navigationId ? t.state : null;
                  setTimeout(() => {
                    this.scheduleNavigation(e, n, r, { replaceUrl: !0 });
                  }, 0);
                }));
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.currentNavigation;
            }
            triggerEvent(t) {
              this.events.next(t);
            }
            resetConfig(t) {
              Tt(t),
                (this.config = t.map(At)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = null));
            }
            createUrlTree(t, e = {}) {
              const {
                relativeTo: n,
                queryParams: r,
                fragment: i,
                preserveQueryParams: o,
                queryParamsHandling: a,
                preserveFragment: c,
              } = e;
              Object(s.T)() &&
                o &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                );
              const u = n || this.routerState.root,
                l = c ? this.currentUrlTree.fragment : i;
              let h = null;
              if (a)
                switch (a) {
                  case "merge":
                    h = Object.assign(
                      Object.assign({}, this.currentUrlTree.queryParams),
                      r
                    );
                    break;
                  case "preserve":
                    h = this.currentUrlTree.queryParams;
                    break;
                  default:
                    h = r || null;
                }
              else h = o ? this.currentUrlTree.queryParams : r || null;
              return (
                null !== h && (h = this.removeEmptyProps(h)),
                (function (t, e, n, r, s) {
                  if (0 === n.length) return we(e.root, e.root, e, r, s);
                  const i = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new _e(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const r = t.reduce((t, r, s) => {
                      if ("object" == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {};
                          return (
                            Dt(r.outlets, (t, n) => {
                              e[n] = "string" == typeof t ? t.split("/") : t;
                            }),
                            [...t, { outlets: e }]
                          );
                        }
                        if (r.segmentPath) return [...t, r.segmentPath];
                      }
                      return "string" != typeof r
                        ? [...t, r]
                        : 0 === s
                        ? (r.split("/").forEach((r, s) => {
                            (0 == s && "." === r) ||
                              (0 == s && "" === r
                                ? (n = !0)
                                : ".." === r
                                ? e++
                                : "" != r && t.push(r));
                          }),
                          t)
                        : [...t, r];
                    }, []);
                    return new _e(n, e, r);
                  })(n);
                  if (i.toRoot()) return we(e.root, new Ht([], {}), e, r, s);
                  const o = (function (t, e, n) {
                      if (t.isAbsolute) return new Ce(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex)
                        return new Ce(n.snapshot._urlSegment, !0, 0);
                      const r = ve(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        let r = t,
                          s = e,
                          i = n;
                        for (; i > s; ) {
                          if (((i -= s), (r = r.parent), !r))
                            throw new Error("Invalid number of '../'");
                          s = r.segments.length;
                        }
                        return new Ce(r, !1, s - i);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + r,
                        t.numberOfDoubleDots
                      );
                    })(i, e, t),
                    a = o.processChildren
                      ? Oe(o.segmentGroup, o.index, i.commands)
                      : xe(o.segmentGroup, o.index, i.commands);
                  return we(o.segmentGroup, a, e, r, s);
                })(u, this.currentUrlTree, t, h, l)
              );
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              Object(s.T)() &&
                this.isNgZoneEnabled &&
                !s.z.isInAngularZone() &&
                this.console.warn(
                  "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
                );
              const n = Ne(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e);
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }
            isActive(t, e) {
              if (Ne(t)) return Lt(this.currentUrlTree, t, e);
              const n = this.parseUrl(t);
              return Lt(this.currentUrlTree, n, e);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n];
                return null != r && (e[n] = r), e;
              }, {});
            }
            processNavigations() {
              this.navigations.subscribe(
                (t) => {
                  (this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    this.events.next(
                      new ot(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree)
                      )
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    (this.currentNavigation = null),
                    t.resolve(!0);
                },
                (t) => {
                  this.console.warn("Unhandled Navigation Error: ");
                }
              );
            }
            scheduleNavigation(t, e, n, r, s) {
              const i = this.getTransition();
              if (
                i &&
                "imperative" !== e &&
                "imperative" === i.source &&
                i.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                i &&
                "hashchange" == e &&
                "popstate" === i.source &&
                i.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                i &&
                "popstate" == e &&
                "hashchange" === i.source &&
                i.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              let o, a, c;
              s
                ? ((o = s.resolve), (a = s.reject), (c = s.promise))
                : (c = new Promise((t, e) => {
                    (o = t), (a = e);
                  }));
              const u = ++this.navigationId;
              return (
                this.setTransition({
                  id: u,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: o,
                  reject: a,
                  promise: c,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                c.catch((t) => Promise.reject(t))
              );
            }
            setBrowserUrl(t, e, n, r) {
              const s = this.urlSerializer.serialize(t);
              (r = r || {}),
                this.location.isCurrentPathEqualTo(s) || e
                  ? this.location.replaceState(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    )
                  : this.location.go(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    );
            }
            resetStateAndUrl(t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }
          }
          return (
            (t.ɵfac = function (t) {
              s.Rb();
            }),
            (t.ɵdir = s.Db({ type: t })),
            t
          );
        })(),
        _n = (() => {
          class t {
            constructor(t, e, n) {
              (this.router = t),
                (this.route = e),
                (this.locationStrategy = n),
                (this.commands = []),
                (this.subscription = t.events.subscribe((t) => {
                  t instanceof ot && this.updateTargetUrlAndHref();
                }));
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            set preserveQueryParams(t) {
              Object(s.T)() &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                ),
                (this.preserve = t);
            }
            ngOnChanges(t) {
              this.updateTargetUrlAndHref();
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            onClick(t, e, n, r) {
              if (0 !== t || e || n || r) return !0;
              if ("string" == typeof this.target && "_self" != this.target)
                return !0;
              const s = {
                skipLocationChange: Cn(this.skipLocationChange),
                replaceUrl: Cn(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, s), !1;
            }
            updateTargetUrlAndHref() {
              this.href = this.locationStrategy.prepareExternalUrl(
                this.router.serializeUrl(this.urlTree)
              );
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: Cn(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: Cn(this.preserveFragment),
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(s.Ib(wn), s.Ib(he), s.Ib(r.i));
            }),
            (t.ɵdir = s.Db({
              type: t,
              selectors: [
                ["a", "routerLink", ""],
                ["area", "routerLink", ""],
              ],
              hostVars: 2,
              hostBindings: function (t, e) {
                1 & t &&
                  s.Sb("click", function (t) {
                    return e.onClick(
                      t.button,
                      t.ctrlKey,
                      t.metaKey,
                      t.shiftKey
                    );
                  }),
                  2 & t &&
                    (s.Nb("href", e.href, s.cc), s.Ab("target", e.target));
              },
              inputs: {
                routerLink: "routerLink",
                preserveQueryParams: "preserveQueryParams",
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                state: "state",
              },
              features: [s.xb],
            })),
            t
          );
        })();
      function Cn(t) {
        return "" === t || !!t;
      }
      class Sn {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new xn()),
            (this.attachRef = null);
        }
      }
      class xn {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new Sn()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let On = (() => {
        class t {
          constructor(t, e, n, r, i) {
            (this.parentContexts = t),
              (this.location = e),
              (this.resolver = n),
              (this.changeDetector = i),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new s.n()),
              (this.deactivateEvents = new s.n()),
              (this.name = r || "primary"),
              t.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name);
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const t = this.activated;
            return (this.activated = null), (this._activatedRoute = null), t;
          }
          attach(t, e) {
            (this.activated = t),
              (this._activatedRoute = e),
              this.location.insert(t.hostView);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, e) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = t;
            const n = (e = e || this.resolver).resolveComponentFactory(
                t._futureSnapshot.routeConfig.component
              ),
              r = this.parentContexts.getOrCreateContext(this.name).children,
              s = new En(t, r, this.location.injector);
            (this.activated = this.location.createComponent(
              n,
              this.location.length,
              s
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              s.Ib(xn),
              s.Ib(s.N),
              s.Ib(s.j),
              s.Pb("name"),
              s.Ib(s.h)
            );
          }),
          (t.ɵdir = s.Db({
            type: t,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
            },
            exportAs: ["outlet"],
          })),
          t
        );
      })();
      class En {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === he
            ? this.route
            : t === xn
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class Tn {}
      class jn {
        preload(t, e) {
          return Object(i.a)(null);
        }
      }
      let In = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new gn(
                  e,
                  n,
                  (e) => t.triggerEvent(new pt(e)),
                  (e) => t.triggerEvent(new gt(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  y((t) => t instanceof ot),
                  W(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(s.x);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children));
              return Object(o.a)(n).pipe(
                Object(rt.a)(),
                Object(g.a)((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                this.loader
                  .load(t.injector, e)
                  .pipe(
                    Object(H.a)(
                      (t) => (
                        (e._loadedConfig = t),
                        this.processRoutes(t.module, t.routes)
                      )
                    )
                  )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                s.Ob(wn),
                s.Ob(s.w),
                s.Ob(s.i),
                s.Ob(s.r),
                s.Ob(Tn)
              );
            }),
            (t.ɵprov = s.Eb({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        An = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof it
                  ? ((this.store[
                      this.lastId
                    ] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof ot &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof wt &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new wt(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (t) {
              s.Rb();
            }),
            (t.ɵdir = s.Db({ type: t })),
            t
          );
        })();
      const kn = new s.q("ROUTER_CONFIGURATION"),
        Rn = new s.q("ROUTER_FORROOT_GUARD"),
        Nn = [
          r.h,
          { provide: zt, useClass: qt },
          {
            provide: wn,
            useFactory: function (t, e, n, s, i, o, a, c = {}, u, l) {
              const h = new wn(null, t, e, n, s, i, o, Nt(a));
              if (
                (u && (h.urlHandlingStrategy = u),
                l && (h.routeReuseStrategy = l),
                c.errorHandler && (h.errorHandler = c.errorHandler),
                c.malformedUriErrorHandler &&
                  (h.malformedUriErrorHandler = c.malformedUriErrorHandler),
                c.enableTracing)
              ) {
                const t = Object(r.p)();
                h.events.subscribe((e) => {
                  t.logGroup(`Router Event: ${e.constructor.name}`),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd();
                });
              }
              return (
                c.onSameUrlNavigation &&
                  (h.onSameUrlNavigation = c.onSameUrlNavigation),
                c.paramsInheritanceStrategy &&
                  (h.paramsInheritanceStrategy = c.paramsInheritanceStrategy),
                c.urlUpdateStrategy &&
                  (h.urlUpdateStrategy = c.urlUpdateStrategy),
                c.relativeLinkResolution &&
                  (h.relativeLinkResolution = c.relativeLinkResolution),
                h
              );
            },
            deps: [
              zt,
              xn,
              r.h,
              s.r,
              s.w,
              s.i,
              pn,
              kn,
              [class {}, new s.A()],
              [class {}, new s.A()],
            ],
          },
          xn,
          {
            provide: he,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [wn],
          },
          { provide: s.w, useClass: s.J },
          In,
          jn,
          class {
            preload(t, e) {
              return e().pipe(Object(P.a)(() => Object(i.a)(null)));
            }
          },
          { provide: kn, useValue: { enableTracing: !1 } },
        ];
      function Pn() {
        return new s.y("Router", wn);
      }
      let Dn = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                Nn,
                Hn(e),
                {
                  provide: Rn,
                  useFactory: Mn,
                  deps: [[wn, new s.A(), new s.I()]],
                },
                { provide: kn, useValue: n || {} },
                {
                  provide: r.i,
                  useFactory: Ln,
                  deps: [r.l, [new s.p(r.a), new s.A()], kn],
                },
                { provide: An, useFactory: Un, deps: [wn, r.m, kn] },
                {
                  provide: Tn,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : jn,
                },
                { provide: s.y, multi: !0, useFactory: Pn },
                [
                  Vn,
                  { provide: s.d, multi: !0, useFactory: Fn, deps: [Vn] },
                  { provide: zn, useFactory: $n, deps: [Vn] },
                  { provide: s.b, multi: !0, useExisting: zn },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [Hn(e)] };
          }
        }
        return (
          (t.ɵmod = s.Gb({ type: t })),
          (t.ɵinj = s.Fb({
            factory: function (e) {
              return new (e || t)(s.Ob(Rn, 8), s.Ob(wn, 8));
            },
          })),
          t
        );
      })();
      function Un(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new An(t, e, n);
      }
      function Ln(t, e, n = {}) {
        return n.useHash ? new r.e(t, e) : new r.k(t, e);
      }
      function Mn(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function Hn(t) {
        return [
          { provide: s.a, multi: !0, useValue: t },
          { provide: pn, multi: !0, useValue: t },
        ];
      }
      let Vn = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new a.a());
          }
          appInitializer() {
            return this.injector.get(r.g, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(wn),
                r = this.injector.get(kn);
              if (this.isLegacyDisabled(r) || this.isLegacyEnabled(r)) t(!0);
              else if ("disabled" === r.initialNavigation)
                n.setUpLocationChangeListener(), t(!0);
              else {
                if ("enabled" !== r.initialNavigation)
                  throw new Error(
                    `Invalid initialNavigation options: '${r.initialNavigation}'`
                  );
                (n.hooks.afterPreactivation = () =>
                  this.initNavigation
                    ? Object(i.a)(null)
                    : ((this.initNavigation = !0),
                      t(!0),
                      this.resultOfPreactivationDone)),
                  n.initialNavigation();
              }
              return e;
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(kn),
              n = this.injector.get(In),
              r = this.injector.get(An),
              i = this.injector.get(wn),
              o = this.injector.get(s.g);
            t === o.components[0] &&
              (this.isLegacyEnabled(e)
                ? i.initialNavigation()
                : this.isLegacyDisabled(e) && i.setUpLocationChangeListener(),
              n.setUpPreloading(),
              r.init(),
              i.resetRootComponentType(o.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          isLegacyEnabled(t) {
            return (
              "legacy_enabled" === t.initialNavigation ||
              !0 === t.initialNavigation ||
              void 0 === t.initialNavigation
            );
          }
          isLegacyDisabled(t) {
            return (
              "legacy_disabled" === t.initialNavigation ||
              !1 === t.initialNavigation
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(s.Ob(s.r));
          }),
          (t.ɵprov = s.Eb({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Fn(t) {
        return t.appInitializer.bind(t);
      }
      function $n(t) {
        return t.bootstrapListener.bind(t);
      }
      const zn = new s.q("Router Initializer");
    },
    yCtX: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return o;
      });
      var r = n("HDdC"),
        s = n("ngJS"),
        i = n("jZKg");
      function o(t, e) {
        return e ? Object(i.a)(t, e) : new r.a(Object(s.a)(t));
      }
    },
    "z+Ro": function (t, e, n) {
      "use strict";
      function r(t) {
        return t && "function" == typeof t.schedule;
      }
      n.d(e, "a", function () {
        return r;
      });
    },
    zUnb: function (t, e, n) {
      "use strict";
      n.r(e);
      var r = n("fXoL"),
        s = n("ofXK");
      class i extends s.n {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      }
      class o extends i {
        static makeCurrent() {
          Object(s.r)(new o());
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            c || ((c = document.querySelector("base")), c)
              ? c.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              a || (a = document.createElement("a")),
              a.setAttribute("href", n),
              "/" === a.pathname.charAt(0) ? a.pathname : "/" + a.pathname);
          var n;
        }
        resetBaseElement() {
          c = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return Object(s.q)(document.cookie, t);
        }
      }
      let a,
        c = null;
      const u = new r.q("TRANSITION_ID"),
        l = [
          {
            provide: r.d,
            useFactory: function (t, e, n) {
              return () => {
                n.get(r.e).donePromise.then(() => {
                  const n = Object(s.p)();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [u, s.d, r.r],
            multi: !0,
          },
        ];
      class h {
        static init() {
          Object(r.V)(new h());
        }
        addToWindow(t) {
          (r.nb.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (r.nb.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (r.nb.getAllAngularRootElements = () => t.getAllRootElements()),
            r.nb.frameworkStabilizers || (r.nb.frameworkStabilizers = []),
            r.nb.frameworkStabilizers.push((t) => {
              const e = r.nb.getAllAngularTestabilities();
              let n = e.length,
                s = !1;
              const i = function (e) {
                (s = s || e), n--, 0 == n && t(s);
              };
              e.forEach(function (t) {
                t.whenStable(i);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? Object(s.p)().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const d = new r.q("EventManagerPlugins");
      let f = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.Ob(d), r.Ob(r.z));
          }),
          (t.ɵprov = r.Eb({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class p {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = Object(s.p)().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let g = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = r.Eb({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        m = (() => {
          class t extends g {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => Object(s.p)().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(r.Ob(s.d));
            }),
            (t.ɵprov = r.Eb({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const b = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        y = /%COMP%/g;
      function v(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? v(t, s, n) : ((s = s.replace(y, t)), n.push(s));
        }
        return n;
      }
      function w(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let _ = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new C(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case r.O.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new S(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case r.O.Native:
              case r.O.ShadowDom:
                return new x(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = v(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.Ob(f), r.Ob(m), r.Ob(r.c));
          }),
          (t.ɵprov = r.Eb({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class C {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(b[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e;
            const s = b[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = b[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, s) {
          s & r.F.DashCase
            ? t.style.setProperty(e, n, s & r.F.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & r.F.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, w(n))
            : this.eventManager.addEventListener(t, e, w(n));
        }
      }
      class S extends C {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = v(r + "-" + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(y, r + "-" + n.id)),
            (this.hostAttr = (function (t) {
              return "_nghost-%COMP%".replace(y, t);
            })(r + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class x extends C {
        constructor(t, e, n, s) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.component = s),
            (this.shadowRoot =
              s.encapsulation === r.O.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = v(s.id, s.styles, []);
          for (let r = 0; r < i.length; r++) {
            const t = document.createElement("style");
            (t.textContent = i[r]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let O = (() => {
        class t extends p {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.Ob(s.d));
          }),
          (t.ɵprov = r.Eb({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const E = ["alt", "control", "meta", "shift"],
        T = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        j = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        I = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let A = (() => {
        class t extends p {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, r) {
            const i = t.parseEventName(n),
              o = t.eventCallback(i.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() =>
                Object(s.p)().onAndCancel(e, i.domEventName, o)
              );
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              r = n.shift();
            if (0 === n.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const s = t._normalizeKey(n.pop());
            let i = "";
            if (
              (E.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (i += t + "."));
              }),
              (i += s),
              0 != n.length || 0 === s.length)
            )
              return null;
            const o = {};
            return (o.domEventName = r), (o.fullKey = i), o;
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && j.hasOwnProperty(e) && (e = j[e]));
                }
                return T[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              E.forEach((r) => {
                r != n && (0, I[r])(t) && (e += r + ".");
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, r) {
            return (s) => {
              t.getEventFullKey(s) === e && r.runGuarded(() => n(s));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(r.Ob(s.d));
          }),
          (t.ɵprov = r.Eb({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const k = [
          { provide: r.B, useValue: s.o },
          {
            provide: r.C,
            useValue: function () {
              o.makeCurrent(), h.init();
            },
            multi: !0,
          },
          {
            provide: s.d,
            useFactory: function () {
              return Object(r.tb)(document), document;
            },
            deps: [],
          },
        ],
        R = Object(r.Q)(r.U, "browser", k),
        N = [
          [],
          { provide: r.X, useValue: "root" },
          {
            provide: r.m,
            useFactory: function () {
              return new r.m();
            },
            deps: [],
          },
          { provide: d, useClass: O, multi: !0, deps: [s.d, r.z, r.B] },
          { provide: d, useClass: A, multi: !0, deps: [s.d] },
          [],
          { provide: _, useClass: _, deps: [f, m, r.c] },
          { provide: r.E, useExisting: _ },
          { provide: g, useExisting: m },
          { provide: m, useClass: m, deps: [s.d] },
          { provide: r.L, useClass: r.L, deps: [r.z] },
          { provide: f, useClass: f, deps: [d, r.z] },
          [],
        ];
      let P = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: r.c, useValue: e.appId },
                { provide: u, useExisting: r.c },
                l,
              ],
            };
          }
        }
        return (
          (t.ɵmod = r.Gb({ type: t })),
          (t.ɵinj = r.Fb({
            factory: function (e) {
              return new (e || t)(r.Ob(t, 12));
            },
            providers: N,
            imports: [s.c, r.f],
          })),
          t
        );
      })();
      "undefined" != typeof window && window;
      var D = n("tyNb");
      const U = [
        {
          path: "loader",
          pathMatch: "full",
          loadChildren: () =>
            Promise.resolve()
              .then(n.bind(null, "eNvI"))
              .then((t) => t.LoaderModule),
        },
        {
          path: "three-js",
          pathMatch: "full",
          loadChildren: () =>
            n
              .e(5)
              .then(n.bind(null, "qBvQ"))
              .then((t) => t.ThreeJsModule),
        },
      ];
      let L = (() => {
          class t {}
          return (
            (t.ɵmod = r.Gb({ type: t })),
            (t.ɵinj = r.Fb({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[D.b.forRoot(U)], D.b],
            })),
            t
          );
        })(),
        M = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = r.Cb({
              type: t,
              selectors: [["app-root"]],
              decls: 5,
              vars: 2,
              consts: [[3, "routerLink"]],
              template: function (t, e) {
                1 & t &&
                  (r.Lb(0, "a", 0),
                  r.gc(1, "Angular with ThreeJS"),
                  r.Kb(),
                  r.Lb(2, "a", 0),
                  r.gc(3, "RXJs loader"),
                  r.Kb(),
                  r.Jb(4, "router-outlet")),
                  2 & t &&
                    (r.Zb("routerLink", "/three-js"),
                    r.zb(2),
                    r.Zb("routerLink", "/loader"));
              },
              directives: [D.a, D.c],
              styles: [""],
            })),
            t
          );
        })();
      var H = n("eNvI");
      let V = (() => {
        class t {}
        return (
          (t.ɵmod = r.Gb({ type: t, bootstrap: [M] })),
          (t.ɵinj = r.Fb({
            factory: function (e) {
              return new (e || t)();
            },
            providers: [],
            imports: [[P, H.LoaderModule, L]],
          })),
          t
        );
      })();
      Object(r.R)(),
        R()
          .bootstrapModule(V)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
