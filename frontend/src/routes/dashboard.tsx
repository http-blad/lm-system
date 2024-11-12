import { RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";

const DashboardLayout = (props: RouteSectionProps) => {
    return <div>{props.children}</div>;
};

export default DashboardLayout;
