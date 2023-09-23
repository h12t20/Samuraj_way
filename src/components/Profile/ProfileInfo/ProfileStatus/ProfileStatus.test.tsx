import React from "react";
import { create } from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from the props should be in the component", () => {
        const status = "IT-Kamasutra"
        const component = create(<ProfileStatus status="IT-Kamasutra" updateStatus={()=>{}}/>);
        const instance = component.getInstance();
        if (instance) { // @ts-ignore
            expect(instance.state.status).toBe("IT-Kamasutra");
        }
    });
    test("after creation div should be displayed", () => {
        const status = "IT-Kamasutra"
        const component = create(<ProfileStatus status="IT-Kamasutra" updateStatus={()=>{}}/>);
        const root = component.root;
        let div = root.findByType("div")
        expect(div).not.toBeNull();
    });
});