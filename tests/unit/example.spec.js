/*
    Web Application for Weather Vortex project.
    Copyright (C) 2021  Tentoni Daniele

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

"use strict";

import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import AppBar from "@/components/AppBar";

describe("HelloWorld.vue", () => {
  let component;

  beforeEach(() => {
    component = shallowMount(AppBar);
  });

  it("renders application name when mounted", () => {
    const msg = "Weather Vortex";
    const title = component.find({ name: "v-toolbar-title" });
    expect(title.exists()).to.be.true;
    expect(title.text()).to.be.equals(msg);
  });
});
