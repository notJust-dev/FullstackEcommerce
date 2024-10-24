import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);import bannerUrl from 'url';const __dirname = bannerUrl.fileURLToPath(new URL('.', import.meta.url));
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@genezio/nextjs-isr-eu-central-1/node_modules/genezio-remote/dist/lib/remote.node.js
var require_remote_node = __commonJS({
  "node_modules/@genezio/nextjs-isr-eu-central-1/node_modules/genezio-remote/dist/lib/remote.node.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Remote = void 0;
    var http = __importStar(__require("http"));
    var https = __importStar(__require("https"));
    async function makeRequestNode(request, url, agent) {
      const data = JSON.stringify(request);
      const hostUrl = new URL(url);
      const options = {
        hostname: hostUrl.hostname,
        path: hostUrl.search ? hostUrl.pathname + hostUrl.search : hostUrl.pathname,
        port: hostUrl.port,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        agent
      };
      const client = url.includes("https") ? https : http;
      return new Promise((resolve, reject) => {
        const req = client.request(options, (res) => {
          let body = "";
          res.on("data", (d) => {
            body += d;
          });
          res.on("end", function() {
            const response = JSON.parse(body);
            resolve(response);
          });
        });
        req.on("error", (error) => {
          reject(error);
        });
        req.write(data);
        req.end();
      });
    }
    var Remote = class {
      constructor(url) {
        this.url = void 0;
        this.agent = void 0;
        this.url = url;
        if (http !== null && https !== null) {
          const client = url.includes("https") ? https : http;
          this.agent = new client.Agent({ keepAlive: true });
        }
      }
      deserialize(s) {
        const e = new Error(s.message);
        e.stack = s.stack;
        e.info = s.info;
        e.code = s.code;
        return e;
      }
      async call(method, ...args) {
        const requestContent = { jsonrpc: "2.0", method, params: args, id: 3 };
        const response = await makeRequestNode(requestContent, this.url, this.agent);
        if (response.error) {
          throw this.deserialize(response.error);
        }
        return response.result;
      }
    };
    exports.Remote = Remote;
  }
});

// node_modules/@genezio/nextjs-isr-eu-central-1/node_modules/genezio-remote/dist/lib/index.node.js
var require_index_node = __commonJS({
  "node_modules/@genezio/nextjs-isr-eu-central-1/node_modules/genezio-remote/dist/lib/index.node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Remote = void 0;
    var remote_node_js_1 = require_remote_node();
    Object.defineProperty(exports, "Remote", { enumerable: true, get: function() {
      return remote_node_js_1.Remote;
    } });
  }
});

// node_modules/@genezio/nextjs-isr-eu-central-1/lib/tagCache.sdk.js
var require_tagCache_sdk = __commonJS({
  "node_modules/@genezio/nextjs-isr-eu-central-1/lib/tagCache.sdk.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCache = void 0;
    var genezio_remote_1 = require_index_node();
    var TagCache2 = (
      /** @class */
      function() {
        function TagCache3() {
        }
        TagCache3.getByTag = function(domainName, token2, tag) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, TagCache3.remote.call("TagCache.getByTag", domainName, token2, tag)];
                case 1:
                  return [2, _a.sent()];
              }
            });
          });
        };
        TagCache3.getByPath = function(domainName, token2, path) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, TagCache3.remote.call("TagCache.getByPath", domainName, token2, path)];
                case 1:
                  return [2, _a.sent()];
              }
            });
          });
        };
        TagCache3.getLastModified = function(domainName, token2, path, lastModified) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, TagCache3.remote.call("TagCache.getLastModified", domainName, token2, path, lastModified)];
                case 1:
                  return [2, _a.sent()];
              }
            });
          });
        };
        TagCache3.writeTags = function(domainName, token2, tags) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, TagCache3.remote.call("TagCache.writeTags", domainName, token2, tags)];
                case 1:
                  return [2, _a.sent()];
              }
            });
          });
        };
        TagCache3.remote = new genezio_remote_1.Remote("https://1b5b287d-4f25-47f2-a318-e16149041bda.eu-central-1.cloud.genez.io");
        return TagCache3;
      }()
    );
    exports.TagCache = TagCache2;
  }
});

// node_modules/@genezio/nextjs-isr-eu-central-1/lib/incrementalCache.sdk.js
var require_incrementalCache_sdk = __commonJS({
  "node_modules/@genezio/nextjs-isr-eu-central-1/lib/incrementalCache.sdk.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IncrementalCache = void 0;
    var genezio_remote_1 = require_index_node();
    var IncrementalCache2 = (
      /** @class */
      function() {
        function IncrementalCache3() {
        }
        IncrementalCache3.get = function(domainName, token2, key, isFetch) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, IncrementalCache3.remote.call("IncrementalCache.get", domainName, token2, key, isFetch)];
                case 1:
                  return [2, _a.sent()];
              }
            });
          });
        };
        IncrementalCache3.set = function(domainName, token2, key, value, isFetch) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, IncrementalCache3.remote.call("IncrementalCache.set", domainName, token2, key, value, isFetch)];
                case 1:
                  return [2, _a.sent()];
              }
            });
          });
        };
        IncrementalCache3.delete = function(domainName, token2, key) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, IncrementalCache3.remote.call("IncrementalCache.delete", domainName, token2, key)];
                case 1:
                  return [2, _a.sent()];
              }
            });
          });
        };
        IncrementalCache3.remote = new genezio_remote_1.Remote("https://a9af9ad8-fdfa-4b72-a6b3-3e5814586fda.eu-central-1.cloud.genez.io");
        return IncrementalCache3;
      }()
    );
    exports.IncrementalCache = IncrementalCache2;
  }
});

// node_modules/@genezio/nextjs-isr-eu-central-1/lib/queue.sdk.js
var require_queue_sdk = __commonJS({
  "node_modules/@genezio/nextjs-isr-eu-central-1/lib/queue.sdk.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Queue = void 0;
    var genezio_remote_1 = require_index_node();
    var Queue2 = (
      /** @class */
      function() {
        function Queue3() {
        }
        Queue3.send = function(domainName, token2, message) {
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, Queue3.remote.call("Queue.send", domainName, token2, message)];
                case 1:
                  return [2, _a.sent()];
              }
            });
          });
        };
        Queue3.remote = new genezio_remote_1.Remote("https://8a22dbb6-5d05-4c10-a6b1-9807b0e1e319.eu-central-1.cloud.genez.io");
        return Queue3;
      }()
    );
    exports.Queue = Queue2;
  }
});

// node_modules/@genezio/nextjs-isr-eu-central-1/lib/storage.js
var require_storage = __commonJS({
  "node_modules/@genezio/nextjs-isr-eu-central-1/lib/storage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorageManager = void 0;
    var LocalStorageWrapper = (
      /** @class */
      function() {
        function LocalStorageWrapper2() {
        }
        LocalStorageWrapper2.prototype.setItem = function(key, value) {
          localStorage.setItem(key, value);
        };
        LocalStorageWrapper2.prototype.getItem = function(key) {
          return localStorage.getItem(key);
        };
        LocalStorageWrapper2.prototype.removeItem = function(key) {
          localStorage.removeItem(key);
        };
        LocalStorageWrapper2.prototype.clear = function() {
          localStorage.clear();
        };
        return LocalStorageWrapper2;
      }()
    );
    var StorageManager = (
      /** @class */
      function() {
        function StorageManager2() {
        }
        StorageManager2.getStorage = function() {
          if (!this.storage) {
            this.storage = new LocalStorageWrapper();
          }
          return this.storage;
        };
        StorageManager2.setStorage = function(storage) {
          this.storage = storage;
        };
        StorageManager2.storage = null;
        return StorageManager2;
      }()
    );
    exports.StorageManager = StorageManager;
  }
});

// node_modules/@genezio/nextjs-isr-eu-central-1/lib/index.js
var require_lib = __commonJS({
  "node_modules/@genezio/nextjs-isr-eu-central-1/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorageManager = exports.Queue = exports.IncrementalCache = exports.TagCache = void 0;
    var tagCache_sdk_1 = require_tagCache_sdk();
    Object.defineProperty(exports, "TagCache", { enumerable: true, get: function() {
      return tagCache_sdk_1.TagCache;
    } });
    var incrementalCache_sdk_1 = require_incrementalCache_sdk();
    Object.defineProperty(exports, "IncrementalCache", { enumerable: true, get: function() {
      return incrementalCache_sdk_1.IncrementalCache;
    } });
    var queue_sdk_1 = require_queue_sdk();
    Object.defineProperty(exports, "Queue", { enumerable: true, get: function() {
      return queue_sdk_1.Queue;
    } });
    var storage_1 = require_storage();
    Object.defineProperty(exports, "StorageManager", { enumerable: true, get: function() {
      return storage_1.StorageManager;
    } });
  }
});

// open-next.config.ts
var import_nextjs_isr_eu_central_1 = __toESM(require_lib());
var deployment = process.env["GENEZIO_DOMAIN_NAME"] || "";
var token = (process.env["GENEZIO_CACHE_TOKEN"] || "") + "/_cache/" + (process.env["NEXT_BUILD_ID"] || "");
var queue = () => ({
  name: "genezio-queue",
  send: import_nextjs_isr_eu_central_1.Queue.send.bind(null, deployment, token)
});
var incrementalCache = () => ({
  name: "genezio-incremental-cache",
  get: import_nextjs_isr_eu_central_1.IncrementalCache.get.bind(null, deployment, token),
  set: import_nextjs_isr_eu_central_1.IncrementalCache.set.bind(null, deployment, token),
  delete: import_nextjs_isr_eu_central_1.IncrementalCache.delete.bind(null, deployment, token)
});
var tagCache = () => ({
  name: "genzio-tag-cache",
  getByTag: import_nextjs_isr_eu_central_1.TagCache.getByTag.bind(null, deployment, token),
  getByPath: import_nextjs_isr_eu_central_1.TagCache.getByPath.bind(null, deployment, token),
  getLastModified: import_nextjs_isr_eu_central_1.TagCache.getLastModified.bind(null, deployment, token),
  writeTags: import_nextjs_isr_eu_central_1.TagCache.writeTags.bind(null, deployment, token)
});
var config = {
  default: {
    override: {
      queue,
      incrementalCache,
      tagCache
    }
  },
  imageOptimization: {
    arch: "x64"
  }
};
var open_next_config_default = config;
export {
  open_next_config_default as default
};
