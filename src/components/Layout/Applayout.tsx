import React from "react"
import Footer from "../Common/Footer";
import { SideMenu } from "./SideMenu";
import AppHeader from "../Common/AppHeader";

export function Applayout ({children}: {children: React.ReactNode}) {

    return (
        <React.Fragment>
            <div className="drawer lg:drawer-open min-h-screen bg-base-100">
                {/* Drawer toggle for mobile */}
                <input id="side-menu" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                <AppHeader />
                {/* Main Content */}
                <main className="flex-1 p-4">{children}</main>
                <Footer />
                </div>
                <SideMenu />
            </div>
        </React.Fragment>
    );
}