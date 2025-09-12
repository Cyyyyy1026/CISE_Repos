"use client" // 标记为客户端组件
import { useEffect } from "react";
function BootstrapClient() {
    useEffect(() => {
        // 加载Bootstrap JS
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return null;
}
export default BootstrapClient;