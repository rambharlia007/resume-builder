import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";
import Popper from "popper.js";
import select2 from "select2";
import bootstrap from "bootstrap";
import "../node_modules/font-awesome/css/font-awesome.css";

let honoursAndAward = {
  challengeName: "",
  title: ""
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabContentWidth: 4,
      name: "",
      title: "",
      description: "",
      email: "",
      phoneNumber: "",
      linkedIn: "",
      location: "",
      skypeId: "",
      skills: [],
      languages: [],
      workExperience: [
        {
          name: "company-1",
          position: "",
          location: "",
          date: "",
          description: "* "
        }
      ],
      organisations: [
        {
          name: ""
        }
      ],
      education: [
        {
          collegeName: "",
          Course: "",
          timePeriod: ""
        }
      ],
      honoursAndAwards: [
        {
          challengeName: "",
          title: ""
        }
      ]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setTab = this.setTab.bind(this);
    this.addCompany = this.addCompany.bind(this);
  }

  addCompany = () => {
    let orgs = this.state.workExperience;
    orgs.push({
      name: `company-${orgs.length + 1}`,
      position: "",
      location: "",
      date: "",
      description: "* "
    });
    this.setState({ workExperience: orgs });
  };

  addOrganisation = () => {
    let orgs = this.state.organisations;
    orgs.push({
      name: ""
    });
    this.setState({ organisations: orgs });
  };

  addEducation = () => {
    let orgs = this.state.education;
    orgs.push({
      collegeName: "",
      Course: "",
      timePeriod: ""
    });
    this.setState({ education: orgs });
  };

  addHonoursAndAward = () => {
    let orgs = this.state.honoursAndAwards;
    orgs.push({
      challengeName: "",
      title: ""
    });
    this.setState({ honoursAndAwards: orgs });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      const workExperience = { ...this.state.workExperience };
      workExperience[index].description = workExperience[
        index
      ].description.substring(0, workExperience[index].description.length - 1);
      workExperience[index].description += "\n" + "* ";
      this.setState({
        [workExperience]: workExperience
      });
    }
  };
  handleArrayInputChange(event, index, innerData) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let data = this.state[innerData];
    data[index][name] = value;
    this.setState({
      [innerData]: data
    });
  }

  setTab = value => {
    if (value == "basicInfo") this.setState({ tabContentWidth: 4 });
    else if (value === "projects") this.setState({ tabContentWidth: 8 });
    else if (value === "organisations") this.setState({ tabContentWidth: 8 });
    else if (value === "preview") this.setState({ tabContentWidth: 5 });
    $(this.refs[value]).tab("show");
  };
  componentDidMount() {
    $(this.refs.s2_lang).select2({
      multiple: "multiple",
      tags: true,
      tokenSeparators: [",", " "]
    });

    $(this.refs.s2_skills).select2({
      multiple: "multiple",
      tags: true,
      tokenSeparators: [",", " "]
    });

    $(this.refs.s2_lang).on("change", e => {
      var data = $(this.refs.s2_lang).val();
      this.setState({ languages: data });
    });
    $('[data-toggle="tooltip"]').tooltip();
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid p15 grey-bg">
          <div className="row">
            <div className="col-md-2">
              <div class="list-group" id="myList" role="tablist">
                <a
                  class="list-group-item list-group-item-action active"
                  ref="basicInfo"
                  href="#home"
                  role="tab"
                  onClick={e => {
                    this.setTab("basicInfo");
                  }}
                >
                  Basic Info
                </a>
                <a
                  class="list-group-item list-group-item-action"
                  ref="projects"
                  href="#profile"
                  role="tab"
                  onClick={e => {
                    this.setTab("projects");
                  }}
                >
                  Projects
                </a>
                <a
                  class="list-group-item list-group-item-action"
                  ref="organisations"
                  href="#messages"
                  role="tab"
                  onClick={e => {
                    this.setTab("organisations");
                  }}
                >
                  Organisations and Educations
                </a>
                <a
                  class="list-group-item list-group-item-action"
                  ref="preview"
                  href="#settings"
                  role="tab"
                  onClick={e => {
                    this.setTab("preview");
                  }}
                >
                  Honours And Awards
                </a>
                <a
                  class="list-group-item list-group-item-action"
                  ref="template_preview"
                  href="#template_preview"
                  role="tab"
                  onClick={e => {
                    this.setTab("template_preview");
                  }}
                >
                  Template Preview
                </a>
              </div>
            </div>
            <div className={"col-md-" + this.state.tabContentWidth}>
              <div class="tab-content">
                <div class="tab-pane active" id="home" role="tabpanel">
                  <div class="card">
                    <div class="card-body">
                      <form>
                        <div class="form-group row">
                          <label
                            for="colFormLabelSm"
                            class="col-sm-3 col-form-label col-form-label-sm"
                          >
                            Name
                          </label>
                          <div class="col-sm-9">
                            <input
                              class="form-control form-control-sm"
                              name="name"
                              value={this.state.name}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="colFormLabelSm"
                            class="col-sm-3 col-form-label col-form-label-sm"
                          >
                            Job Title
                          </label>
                          <div class="col-sm-9">
                            <input
                              type="email"
                              class="form-control form-control-sm"
                              name="title"
                              value={this.state.title}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="colFormLabelSm"
                            class="col-sm-3 col-form-label col-form-label-sm"
                          >
                            Description
                          </label>
                          <div class="col-sm-9">
                            <input
                              type="email"
                              class="form-control form-control-sm"
                              name="description"
                              value={this.state.description}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Email
                          </label>
                          <div class="col-sm-9">
                            <input
                              class="form-control form-control-sm"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Phone Number
                          </label>
                          <div class="col-sm-9">
                            <input
                              class="form-control form-control-sm"
                              name="phoneNumber"
                              value={this.state.phoneNumber}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            LinkedIn url
                          </label>
                          <div class="col-sm-9">
                            <input
                              class="form-control form-control-sm"
                              name="linkedIn"
                              value={this.state.linkedIn}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Skype Id
                          </label>
                          <div class="col-sm-9">
                            <input
                              class="form-control form-control-sm"
                              name="skypeId"
                              value={this.state.skypeId}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Location
                          </label>
                          <div class="col-sm-9">
                            <input
                              class="form-control form-control-sm"
                              name="location"
                              value={this.state.location}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label col-form-label-sm">
                            Languages &nbsp;
                            <i
                              class="fas fa-info-circle"
                              data-toggle="tooltip"
                              data-placement="right"
                              title="If language is not available, please type in the language and hit enter"
                            />
                          </label>
                          <div class="col-sm-9">
                            <select
                              class="form-control form-control-sm"
                              ref="s2_lang"
                              multiple={true}
                              class="form-control"
                              value={this.state.languages}
                              onChange={this.handleInputChange}
                            >
                              <option value="English">English</option>
                              <option value="Hindi">Hindi</option>
                              <option value="Kannada">Kannada</option>
                              <option value="Tamil">Tamil</option>
                              <option value="Telugu">Telugu</option>
                              <option value="Malayalam">Malayalam</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label className="col-sm-3 col-form-label col-form-label-sm">
                            Skills &nbsp;
                            <i
                              class="fas fa-info-circle"
                              data-toggle="tooltip"
                              data-placement="right"
                              title="If Skill is not available in the list, please type in the skill and hit enter"
                            />
                          </label>
                          <div class="col-sm-9">
                            <select
                              class="form-control form-control-sm"
                              ref="s2_skills"
                              multiple={true}
                              class="form-control"
                              value={this.state.skills}
                              onChange={this.handleInputChange}
                            >
                              <option value="Dotnet">Dotnet</option>
                              <option value="c#">c#</option>
                              <option value="Java">Java</option>
                              <option value="Entity Framework">
                                Entity Framework
                              </option>
                              <option value="Angular">Angular</option>
                              <option value="React">React</option>
                            </select>
                          </div>{" "}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="profile" role="tabpanel">
                  <div id="accordion-company">
                    {this.state.workExperience.map((value, index) => {
                      return (
                        <div class="card" key={index}>
                          <div class="card-header p0">
                            <h5 class="mb-0">
                              <button
                                class="btn btn-link"
                                data-toggle="collapse"
                                data-target={"#company-" + index}
                                aria-expanded="true"
                                aria-controls={"company-" + index}
                              >
                                {value.name}
                              </button>
                            </h5>
                          </div>

                          <div
                            id={"company-" + index}
                            class="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordion-company"
                          >
                            <div class="card-body">
                              <form>
                                <div className="row">
                                  <div className="col-md-5">
                                    <div class="form-group row">
                                      <label
                                        for="colFormLabelSm"
                                        class="col-sm-3 col-form-label col-form-label-sm"
                                      >
                                        Company Name
                                      </label>
                                      <div class="col-sm-9">
                                        <input
                                          class="form-control form-control-sm"
                                          name="name"
                                          value={
                                            this.state.workExperience[index]
                                              .name
                                          }
                                          onChange={event => {
                                            this.handleArrayInputChange(
                                              event,
                                              index,
                                              "workExperience"
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div class="form-group row">
                                      <label
                                        for="colFormLabelSm"
                                        class="col-sm-3 col-form-label col-form-label-sm"
                                      >
                                        Position
                                      </label>
                                      <div class="col-sm-9">
                                        <input
                                          type="email"
                                          class="form-control form-control-sm"
                                          name="position"
                                          value={
                                            this.state.workExperience[index]
                                              .position
                                          }
                                          onChange={event => {
                                            this.handleArrayInputChange(
                                              event,
                                              index,
                                              "workExperience"
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div class="form-group row">
                                      <label
                                        for="colFormLabelSm"
                                        class="col-sm-3 col-form-label col-form-label-sm"
                                      >
                                        Location
                                      </label>
                                      <div class="col-sm-9">
                                        <input
                                          type="email"
                                          class="form-control form-control-sm"
                                          name="location"
                                          value={
                                            this.state.workExperience[index]
                                              .location
                                          }
                                          onChange={event => {
                                            this.handleArrayInputChange(
                                              event,
                                              index,
                                              "workExperience"
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div class="form-group row">
                                      <label
                                        for="colFormLabelSm"
                                        class="col-sm-3 col-form-label col-form-label-sm"
                                      >
                                        Date
                                      </label>
                                      <div class="col-sm-9">
                                        <input
                                          type="email"
                                          class="form-control form-control-sm"
                                          name="date"
                                          value={
                                            this.state.workExperience[index]
                                              .date
                                          }
                                          onChange={event => {
                                            this.handleArrayInputChange(
                                              event,
                                              index,
                                              "workExperience"
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-7">
                                    <div class="form-group row">
                                      <label
                                        for="colFormLabelSm"
                                        class="col-sm-2.5 col-form-label col-form-label-sm"
                                      >
                                        Description
                                      </label>
                                      <div class="col-sm-10">
                                        <textarea
                                          class="form-control form-control-sm min-h"
                                          name="description"
                                          value={
                                            this.state.workExperience[index]
                                              .description
                                          }
                                          onChange={event => {
                                            this.handleArrayInputChange(
                                              event,
                                              index,
                                              "workExperience"
                                            );
                                          }}
                                          onKeyUp={event => {
                                            this.handleKeyPress(event, index);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    class="btn btn-link btn-sm"
                    onClick={this.addCompany}
                  >
                    Add Project
                  </button>
                </div>
                <div class="tab-pane" id="messages" role="tabpanel">
                  <div class="card">
                    <div class="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <h5 class="card-title">Organisations</h5>
                          <div class="card">
                            <div class="card-body">
                              <div class="form-group row">
                                <label
                                  for="colFormLabelSm"
                                  class="col-sm-3 col-form-label col-form-label-sm"
                                >
                                  Name &nbsp;
                                  <i
                                    class="fas fa-info-circle"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Example: TCS (March-2015 to April-2016)"
                                  />
                                </label>
                                {this.state.organisations.map(
                                  (value, index) => {
                                    return (
                                      <div class="col-sm-12 pt10">
                                        <input
                                          class="form-control form-control-sm"
                                          name="name"
                                          value={
                                            this.state.organisations[index].name
                                          }
                                          onChange={event => {
                                            this.handleArrayInputChange(
                                              event,
                                              index,
                                              "organisations"
                                            );
                                          }}
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h5 class="card-title">Educations</h5>
                          <div id="accordion-education">
                            {this.state.education.map((value, index) => {
                              return (
                                <div class="card pt10" key={index}>
                                  <div class="card-header p0">
                                    <h5 class="mb-0">
                                      <button
                                        class="btn btn-link"
                                        data-toggle="collapse"
                                        data-target={"#education-" + index}
                                        aria-expanded="true"
                                        aria-controls={"education-" + index}
                                      >
                                        {value.name}
                                      </button>
                                    </h5>
                                  </div>
                                  <div
                                    id={"education-" + index}
                                    class="collapse show"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordion-education"
                                  >
                                    <div class="card-body">
                                      <form>
                                        <div class="form-group row">
                                          <label
                                            for="colFormLabelSm"
                                            class="col-sm-3 col-form-label col-form-label-sm"
                                          >
                                            Collage name &nbsp;
                                            <i
                                              class="fas fa-info-circle"
                                              data-toggle="tooltip"
                                              data-placement="right"
                                              title="University Visvesvaraya College Of Engineering"
                                            />
                                          </label>
                                          <div class="col-sm-9">
                                            <input
                                              class="form-control form-control-sm"
                                              name="collegeName"
                                              value={
                                                this.state.education[index]
                                                  .collegeName
                                              }
                                              onChange={event => {
                                                this.handleArrayInputChange(
                                                  event,
                                                  index,
                                                  "education"
                                                );
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div class="form-group row">
                                          <label
                                            for="colFormLabelSm"
                                            class="col-sm-3 col-form-label col-form-label-sm"
                                          >
                                            Course &nbsp;
                                            <i
                                              class="fas fa-info-circle"
                                              data-toggle="tooltip"
                                              data-placement="right"
                                              title="Example: BE in computer science"
                                            />
                                          </label>
                                          <div class="col-sm-9">
                                            <input
                                              class="form-control form-control-sm"
                                              name="course"
                                              value={
                                                this.state.education[index]
                                                  .course
                                              }
                                              onChange={event => {
                                                this.handleArrayInputChange(
                                                  event,
                                                  index,
                                                  "education"
                                                );
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div class="form-group row">
                                          <label
                                            for="colFormLabelSm"
                                            class="col-sm-3 col-form-label col-form-label-sm"
                                          >
                                            Period &nbsp;
                                            <i
                                              class="fas fa-info-circle"
                                              data-toggle="tooltip"
                                              data-placement="right"
                                              title="2011-2015"
                                            />
                                          </label>
                                          <div class="col-sm-9">
                                            <input
                                              class="form-control form-control-sm"
                                              name="timePeriod"
                                              value={
                                                this.state.education[index]
                                                  .timePeriod
                                              }
                                              onChange={event => {
                                                this.handleArrayInputChange(
                                                  event,
                                                  index,
                                                  "education"
                                                );
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-link btn-sm"
                    onClick={this.addOrganisation}
                  >
                    Add Organisation
                  </button>
                  <button
                    type="button"
                    class="btn btn-link btn-sm"
                    onClick={this.addEducation}
                  >
                    Add Education
                  </button>
                </div>
                <div class="tab-pane" id="settings" role="tabpanel">
                  <h5 class="card-title">Honours and Awards</h5>
                  <div id="accordion-honours_and_awards">
                    {this.state.honoursAndAwards.map((value, index) => {
                      return (
                        <div class="card pt10" key={index}>
                          <div class="card-header p0">
                            <h5 class="mb-0">
                              <button
                                class="btn btn-link"
                                data-toggle="collapse"
                                data-target={
                                  "#accordion-honours_and_awards-" + index
                                }
                                aria-expanded="true"
                                aria-controls={
                                  "accordion-honours_and_awards-" + index
                                }
                              >
                                {value.name}
                              </button>
                            </h5>
                          </div>
                          <div
                            id={"accordion-honours_and_awards-" + index}
                            class="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordion-honours_and_awards"
                          >
                            <div class="card-body">
                              <form>
                                <div class="form-group row">
                                  <label
                                    for="colFormLabelSm"
                                    class="col-sm-3 col-form-label col-form-label-sm"
                                  >
                                    Compitation &nbsp;
                                    <i
                                      class="fas fa-info-circle"
                                      data-toggle="tooltip"
                                      data-placement="right"
                                      title="Example: Hacker rank june coding competation"
                                    />
                                  </label>
                                  <div class="col-sm-9">
                                    <input
                                      class="form-control form-control-sm"
                                      name="challengeName"
                                      value={
                                        this.state.honoursAndAwards[index]
                                          .challengeName
                                      }
                                      onChange={event => {
                                        this.handleArrayInputChange(
                                          event,
                                          index,
                                          "honoursAndAwards"
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                                <div class="form-group row">
                                  <label
                                    for="colFormLabelSm"
                                    class="col-sm-3 col-form-label col-form-label-sm"
                                  >
                                    Winning Title &nbsp;
                                    <i
                                      class="fas fa-info-circle"
                                      data-toggle="tooltip"
                                      data-placement="right"
                                      title="Example: Coder of the month"
                                    />
                                  </label>
                                  <div class="col-sm-9">
                                    <input
                                      class="form-control form-control-sm"
                                      name="title"
                                      value={
                                        this.state.honoursAndAwards[index].title
                                      }
                                      onChange={event => {
                                        this.handleArrayInputChange(
                                          event,
                                          index,
                                          "honoursAndAwards"
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    class="btn btn-link btn-sm"
                    onClick={this.addHonoursAndAward}
                  >
                    Add Honours and Awards
                  </button>
                </div>

                <div class="tab-pane" id="template_preview" role="tabpanel">
                  <div class="col-md-10">
                    <div class="row">
                      <div
                        class="col-md-4"
                        style="background-color:#eeee; -webkit-print-color-adjust:exact;"
                      >
                        <div style="padding:20px; text-align:center">
                          <img
                            src="C:\Users\rambh\Downloads\Webp.net-resizeimage.jpg"
                            width="150"
                            height="150"
                            alt="file:///D:/resume_img.svg"
                            class="rounded-circle"
                          />
                        </div>
                        <div style="padding-bottom: 10px;">
                          <p class="font-weight-normal no-m-bottom">
                            <i class="fas fa-envelope def-text-color" />{" "}
                            rambharlia007@gmail.com
                          </p>
                        </div>
                        <div style="padding-bottom: 10px;">
                          <p class="font-weight-normal no-m-bottom">
                            <i class="fas fa-mobile def-text-color" />{" "}
                            8792092047
                          </p>
                        </div>
                        <div style="padding-bottom: 10px;">
                          <p class="font-weight-normal no-m-bottom">
                            <i class="fas fa-map-marker-alt def-text-color" />{" "}
                            Bangalore, India
                          </p>
                        </div>
                        <div style="padding-bottom: 10px;">
                          <p class="font-weight-normal no-m-bottom">
                            <i class="fab fa-linkedin def-text-color" />{" "}
                            linked.in/rambharlia
                          </p>
                        </div>
                        <div style="padding-bottom: 10px;">
                          <p class="font-weight-normal no-m-bottom">
                            <i class="fab fa-skype def-text-color" />{" "}
                            ram.bharlia
                          </p>
                        </div>
                        <div>
                          <h3
                            class="def-text-color text-uppercase"
                            style="padding-top: 20px;"
                          >
                            Skills
                          </h3>
                          <hr
                            class="no-m-top"
                            style="border-top: 3px solid #3ec7b9;"
                          />
                          <span class="border rounded skill-padding">
                            Entity Framework
                          </span>
                          <br />
                          <span class="border rounded skill-padding">c#</span>
                          <br />
                          <span class="border rounded skill-padding">
                            NodeJs
                          </span>
                          <br />
                          <span class="border rounded skill-padding">
                            SQL server
                          </span>
                          <br />
                          <span class="border rounded skill-padding">
                            Angular
                          </span>
                          <br />
                          <span class="border rounded skill-padding">
                            React
                          </span>
                          <br />
                          <span class="border rounded skill-padding">Git</span>
                          <br />
                          <span class="border rounded skill-padding">
                            Vue JS
                          </span>
                          <br />
                        </div>
                        <div>
                          <h3
                            class="def-text-color text-uppercase"
                            style="padding-top: 20px;"
                          >
                            Languages
                          </h3>
                          <hr
                            class="no-m-top"
                            style="border-top: 3px solid #3ec7b9;"
                          />
                          <span class="border rounded skill-padding">
                            Hindi
                          </span>
                          <br />
                          <span class="border rounded skill-padding">
                            Kannada
                          </span>
                          <br />
                          <span class="border rounded skill-padding">
                            English
                          </span>
                          <br />
                        </div>
                      </div>
                      <div class="col-md-8">
                        <div
                          class="card"
                          style="width: 100%; background-color: #3ec7b9;min-height: 150px; color: #fffffff5; -webkit-print-color-adjust:exact;"
                        >
                          <div class="card-body">
                            <h3 class="card-title" style="color: #fffffff5;">
                              Ram Bharlia
                            </h3>
                            <p
                              class="card-subtitle mb-2 text-muted"
                              style="color: #fffffff5 !important; font-size: 1.3em;"
                            >
                              Full stack dotnet/NodeJs Developer
                            </p>
                            <hr
                              class="no-m-top"
                              style="border-top: 2px solid rgba(255,255,255,.5);"
                            />
                            <p class="card-text" style="color: #fffffff5;">
                              Since Bootstrap is developed to be mobile first,
                              we use a handful of media queries to create
                              sensible breakpoints for our layouts and
                              interfaces. These breakpoints are mostly based on
                              minimum viewport widths and allow us to scale up
                              elements as the viewport changes. Bootstrap
                              primarily uses the following media query ranges—or
                              breakpoints—in our source Sass files for our
                              layout, grid system, and components.
                            </p>
                          </div>
                        </div>
                        <div>
                          <h3
                            class="def-text-color text-uppercase"
                            style="padding-top: 20px;"
                          >
                            Work Experience
                          </h3>
                          <hr
                            class="no-m-top"
                            style="border-top: 3px solid #3ec7b9;"
                          />
                          <h4 class="def-text-color no-m-bottom">
                            Business Development Manager
                          </h4>
                          <h4 class="no-m-bottom">AirState Solutions</h4>
                          <p class="font-italic def-text-color no-m-bottom">
                            09/2014 - 06/2017
                            <span style="float: right;">Bangalore, India</span>
                          </p>
                          <p class="font-weight-normal no-m-bottom">
                            <span class="def-text-color"> &#x25A0;</span> Since
                            Bootstrap is developed to be mobile first, we use a
                            handful of media queries to create sensible
                            breakpoints for our layouts and interfaces
                          </p>
                          <p class="font-weight-normal no-m-bottom">
                            <span class="def-text-color"> &#x25A0;</span> Since
                            Bootstrap is developed to be mobile first, we use a
                            handful of media queries to create sensible
                            breakpoints for our layouts and interfaces
                          </p>
                          <p class="font-weight-normal no-m-bottom">
                            <span class="def-text-color"> &#x25A0;</span> Since
                            Bootstrap is developed to be mobile first, we use a
                            handful of media queries to create sensible
                            breakpoints for our layouts and interfaces
                          </p>
                          <p class="font-weight-normal no-m-bottom">
                            <span class="def-text-color"> &#x25A0;</span> Since
                            Bootstrap is developed to be mobile first, we use a
                            handful of media queries to create sensible
                            breakpoints for our layouts and interfaces
                          </p>
                        </div>

                        <div style="padding-top: 20px;">
                          <h4 class="def-text-color no-m-bottom">
                            Business Development Assistant
                          </h4>
                          <h4 class="no-m-bottom">AirState Solutions</h4>
                          <p class="font-italic def-text-color no-m-bottom">
                            09/2014 - 06/2017
                            <span style="float: right;">Mysore, India</span>
                          </p>
                          <p class="font-weight-normal no-m-bottom">
                            <span class="def-text-color"> &#x25A0;</span> Since
                            Bootstrap is developed to be mobile first, we use a
                            handful of media queries to create sensible
                            breakpoints for our layouts and interfaces
                          </p>
                          <p class="font-weight-normal no-m-bottom">
                            <span class="def-text-color"> &#x25A0;</span> Since
                            Bootstrap is developed to be mobile first, we use a
                            handful of media queries to create sensible
                            breakpoints for our layouts and interfaces
                          </p>
                          <p class="font-weight-normal no-m-bottom">
                            <span class="def-text-color"> &#x25A0;</span> Since
                            Bootstrap is developed to be mobile first, we use a
                            handful of media queries to create sensible
                            breakpoints for our layouts and interfaces
                          </p>
                          <p class="font-weight-normal no-m-bottom">
                            <span class="def-text-color"> &#x25A0;</span> Since
                            Bootstrap is developed to be mobile first, we use a
                            handful of media queries to create sensible
                            breakpoints for our layouts and interfaces
                          </p>
                        </div>

                        <div>
                          <h3
                            class="def-text-color text-uppercase"
                            style="padding-top: 20px;"
                          >
                            Organisations
                          </h3>
                          <hr
                            class="no-m-top"
                            style="border-top: 3px solid #3ec7b9;"
                          />
                          <p class="font-weight-normal">DeltaX (2015-2018)</p>
                          <p class="font-weight-normal">DevOn (2018-2019)</p>
                          <p class="font-weight-normal">
                            Jobless (2019-Present)
                          </p>
                        </div>

                        <div style="padding-bottom:20px;">
                          <h3
                            class="def-text-color text-uppercase"
                            style="padding-top: 20px;"
                          >
                            Education
                          </h3>
                          <hr
                            class="no-m-top"
                            style="border-top: 3px solid #3ec7b9;"
                          />
                          <div style="padding-bottom:20px;">
                            <h4 class="def-text-color no-m-bottom">PCME</h4>
                            <h5 class="no-m-bottom">
                              ST. Joseph's pre university
                            </h5>
                            <p class="font-italic def-text-color no-m-bottom">
                              09/2014 - 06/2017{" "}
                            </p>
                          </div>
                          <div style="padding-bottom:20px;">
                            <h4 class="def-text-color no-m-bottom">
                              BE in computer science
                            </h4>
                            <h5 class="no-m-bottom">
                              University Visvesvaraya college of engineering
                            </h5>
                            <p class="font-italic def-text-color no-m-bottom">
                              09/2014 - 06/2017{" "}
                            </p>
                          </div>
                        </div>

                        <div style="padding-bottom:20px;">
                          <h3
                            class="def-text-color text-uppercase"
                            style="padding-top: 20px;"
                          >
                            Honours and awards
                          </h3>
                          <hr
                            class="no-m-top"
                            style="border-top: 3px solid #3ec7b9;"
                          />
                          <h5 class="no-m-bottom">
                            Hacker rank challenge, coder of the month
                          </h5>
                          <p>Hacker rank online competation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default App;
