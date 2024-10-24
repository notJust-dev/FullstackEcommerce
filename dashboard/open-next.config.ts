
    import { IncrementalCache, Queue, TagCache } from "@genezio/nextjs-isr-eu-central-1";

    const deployment = process.env["GENEZIO_DOMAIN_NAME"] || "";
    const token = (process.env["GENEZIO_CACHE_TOKEN"] || "") + "/_cache/" + (process.env["NEXT_BUILD_ID"] || "");

    const queue = () => ({
        name: "genezio-queue",
        send: Queue.send.bind(null, deployment, token),
    });

    const incrementalCache = () => ({
        name: "genezio-incremental-cache",
        get: IncrementalCache.get.bind(null, deployment, token),
        set: IncrementalCache.set.bind(null, deployment, token),
        delete: IncrementalCache.delete.bind(null, deployment, token),
    });

    const tagCache = () => ({
        name: "genzio-tag-cache",
        getByTag: TagCache.getByTag.bind(null, deployment, token),
        getByPath: TagCache.getByPath.bind(null, deployment, token),
        getLastModified: TagCache.getLastModified.bind(null, deployment, token),
        writeTags: TagCache.writeTags.bind(null, deployment, token),
    });

    const config = {
        default: {
            override: {
                queue,
                incrementalCache,
                tagCache,
            },
        },
        
        imageOptimization: {
            arch: "x64",
        },
    };

    export default config;