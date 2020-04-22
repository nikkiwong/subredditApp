import React from "react";
import { mount } from "enzyme";
import GetSubreddit from "../components/GetSubreddits";
import testData from "./testData";

describe("GetSubreddit Component", () => {
  let wrapper;
  const event = { preventDefault: () => {}, target: { value: "reactjs" } };
  const setSubredditData = jest.fn();

  beforeEach(() => {
    wrapper = mount(<GetSubreddit subredditData={setSubredditData} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("render inputbox", () => {
    expect(wrapper.containsMatchingElement(<input />)).toEqual(true);
  });

  describe("directly invoking the methods from component instance", () => {
    
    test("handleChange: should set state value to inputted value", () => {
      expect(wrapper.state("inputValue")).toBe("");
      wrapper.instance().handleChange(event);
      expect(wrapper.state("inputValue")).toBe("reactjs");
    });

    test("compare: sorts in descending order", () => {
      let arrayObj = [
        { data: { created_utc: 1585706639 } },
        { data: { created_utc: 1565706639 } },
        { data: { created_utc: 1585406639 } },
        { data: { created_utc: 1385706639 } },
        { data: { created_utc: 1785706639 } }
      ];
      let sortedArray = [
        { data: { created_utc: 1785706639 } },
        { data: { created_utc: 1585706639 } },
        { data: { created_utc: 1585406639 } },
        { data: { created_utc: 1565706639 } },
        { data: { created_utc: 1385706639 } }
      ];
      const sorted = arrayObj.sort(wrapper.instance().compareDate);
      expect(sorted).toEqual(sortedArray);
    });

    test("handleSubmit: must return data and set loading to false on successful api call", done => {
      wrapper.instance().handleChange(event);
      let fetch = jest.fn();
      let spyDidMount = jest.spyOn(wrapper.instance(), "handleSubmit");
      fetch.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => {
            return Promise.resolve(testData);
          }
        });
      });

      const didSubmit = wrapper.instance().handleSubmit(event);
      expect(spyDidMount).toHaveBeenCalled();
      didSubmit.then(() => {
        wrapper.update();
        let apiReturnedData = wrapper.state("data").data.children
        expect(wrapper.state("loading")).toBe(false);
        expect(apiReturnedData.length).toBeGreaterThan(0);
        spyDidMount.mockRestore();
        fetch.mockClear();
        done();
      });
    });
  });

  test("loading sign should not be present if loading is false", () => {
    expect(wrapper.state("loading")).toBe(false);
    expect(wrapper.find("#loading").text()).toBe("");
  });
});
