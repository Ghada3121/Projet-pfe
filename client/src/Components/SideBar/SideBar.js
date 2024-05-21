import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((state) => state.LoginReducer);
  const [sidebarElements, setSidebarElements] = useState([
    //  Admin Sidebar Elements
    {
      id: 0,
      name: "Dashboard",
      icon: "ti-home",
      subMenu: false,
      path: "/admin/dashboard",
      active: true,
      user: "admin",
    },
    {
      id: 1,
      name: "Groups",
      icon: "ti-ruler-pencil",
      subMenu: true,
      active: false,
      user: "admin",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Groups List",
            path: "/admin/groups-list",
          },
          {
            name: "Add Group",
            path: "/admin/add-group",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Subjects",
      icon: "ti-book",
      subMenu: true,
      active: false,
      user: "admin",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Subjects List",
            path: "/admin/subjects-list",
          },
          {
            name: "Add Subject",
            path: "/admin/add-subject",
          },
        ],
      },
    },
    {
      id: 3,
      name: "Students",
      icon: "ti-user",
      subMenu: true,
      active: false,
      user: "admin",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Students List",
            path: "/admin/students-list",
          },
          {
            name: "Add Student",
            path: "/admin/add-student",
          },
        ],
      },
    },
    {
      id: 4,
      name: "Professor",
      icon: "ti-briefcase",
      subMenu: true,
      active: false,
      user: "admin",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Professor List",
            path: "/admin/professors-list",
          },
          {
            name: "Add Professor",
            path: "/admin/add-professor",
          },
        ],
      },
    },
    {
      id: 5,
      name: "Event",
      icon: "ti-time",
      subMenu: true,
      active: false,
      user: "admin",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Event List",
            path: "/admin/event-list",
          },
          {
            name: "Add Event",
            path: "/admin/add-event",
          },
        ],
      },
    },
    // professor Sidebar Elements
    {
      id: 6,
      name: "Dashboard",
      icon: "ti-home",
      subMenu: false,
      path: "/professor/dashboard",
      active: true,
      user: "professor",
    },
    {
      id: 7,
      name: "Attendance",
      icon: "ti-pencil",
      subMenu: true,
      active: false,
      user: "professor",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Add My Attendance",
            path: "/professor/add-my-attendance",
          },
          {
            name: "Mark Students Attendance",
            path: "/professor/add-attendance",
          },
          {
            name: "Attendance History",
            path: "/professor/attendance",
          },
        ],
      },
    },
    {
      id: 8,
      name: "Exam",
      icon: "ti-pencil-alt",
      subMenu: true,
      active: false,
      user: "professor",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Exam List",
            path: "/professor/exam-list",
          },
          {
            name: "Add Exam Date",
            path: "/professor/add-exam",
          },
        ],
      },
    },

    {
      id: 9,
      name: "Course",
      icon: "ti-book",
      subMenu: true,
      active: false,
      user: "professor",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Course List",
            path: "/professor/course-list",
          },
          {
            name: "Add Course",
            path: "/professor/add-course",
          },
        ],
      },
    },
    {
      id: 10,
      name: "Notes",
      icon: "ti-notepad",
      subMenu: true,
      active: false,
      user: "professor",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Notes List",
            path: "/professor/notes-list",
          },
          {
            name: "Add Note",
            path: "/professor/add-note",
          },
        ],
      },
    },
    // student Sidebar Elements
    {
      id: 11,
      name: "Dashboard",
      icon: "ti-home",
      subMenu: false,
      path: "/student/dashboard",
      active: true,
      user: "student",
    },
    {
      id: 12,
      name: "Attendance",
      icon: "ti-pencil",
      path: "/student/absence",
      subMenu: false,
      active: false,
      user: "student",
    },
    {
      id: 13,
      name: "Exam",
      icon: "ti-pencil-alt",
      subMenu: true,
      active: false,
      user: "student",
      subMenuDetails: {
        active: false,
        details: [
          {
            name: "Exam Date",
            path: "/student/exam-date",
          },
          {
            name: "Exam Score",
            path: "/student/notes",
          },
          {
            name: "Average",
            path: "/student/moyenne",
          },
        ],
      },
    },

    {
      id: 14,
      name: "Course",
      icon: "ti-book",
      path: "/student/courses",
      subMenu: false,
      active: false,
      user: "student",
    },
    {
      id: 15,
      name: "class Routine",
      icon: "ti-notepad",
      path: "/student/class-routine",
      subMenu: false,
      active: false,
      user: "student",
    },
  ]);
  const activeSubMenu = (index) => {
    setSidebarElements((prevState) => {
      const updatedElements = prevState.map((element, i) => {
        if (i === index) {
          if (element.subMenu) {
            return {
              ...element,
              subMenuDetails: {
                ...element.subMenuDetails,
                active: !element.subMenuDetails.active,
              },
            };
          } else {
            return element;
          }
        } else {
          return {
            ...element,
            subMenuDetails: {
              ...element.subMenuDetails,
              active: false,
            },
          };
        }
      });
      return updatedElements;
    });
  };
  const location = useLocation();
  useEffect(() => {
    const updatedSidebarElements = sidebarElements.map((element) => {
      if (element.path === location.pathname) {
        return { ...element, active: true };
      } else if (element.subMenu) {
        const isPathFound = element.subMenuDetails.details.some(
          (detail) => detail.path === location.pathname
        );

        return {
          ...element,
          active: isPathFound,
          subMenuDetails: {
            ...element.subMenuDetails,
            active: isPathFound,
          },
        };
      } else {
        return { ...element, active: false };
      }
    });
    setSidebarElements(updatedSidebarElements);

    // eslint-disable-next-line
  }, [location.pathname]);
  return (
    <div
      className="pcoded-navbar"
      style={{ background: "#f6f7fb" }}
      navbar-theme="themelight"
      active-item-theme="theme7"
      sub-item-theme="theme2"
      active-item-style="style0"
      pcoded-navbar-position="fixed"
    >
      <div
        className="pcoded-inner-navbar main-menu  "
        style={{ height: "calc(100% - 90px)" }}
      >
        <div>
          <div
            className="pcoded-navigatio-lavel"
            data-i18n="nav.category.navigation"
            menu-title-theme="theme1"
          >
            menu
          </div>

          {sidebarElements.map((element, index) => {
            return (
              <ul
                className="pcoded-item pcoded-left-item"
                item-border="true"
                item-border-style="none"
                subitem-border="true"
                key={index}
              >
                <li
                  className={
                    element.subMenu &&
                    element.subMenuDetails.active &&
                    element.active
                      ? "pcoded-hasmenu pcoded-trigger active"
                      : element.subMenu && element.subMenuDetails.active
                      ? "pcoded-hasmenu pcoded-trigger"
                      : element.subMenu
                      ? "pcoded-hasmenu"
                      : element.active
                      ? "active"
                      : null
                  }
                  dropdown-icon="style3"
                  subitem-icon="style7"
                  onClick={() => activeSubMenu(index)}
                >
                  {element.user === user.role ? (
                    <>
                      <Link
                        to={element.path !== undefined ? element.path : null}
                      >
                        <span className="pcoded-micon">
                          <i className={element.icon} />
                        </span>
                        <span
                          className="pcoded-mtext"
                          data-i18n="nav.basic-components.main"
                        >
                          {element.name}
                        </span>
                        <span className="pcoded-mcaret" />
                      </Link>
                      <ul className="pcoded-submenu">
                        {element.subMenu
                          ? element.subMenuDetails.details.map(
                              (submenu, index) => {
                                return (
                                  <li className="" key={index}>
                                    <Link to={submenu.path}>
                                      <span className="pcoded-micon">
                                        <i className="ti-angle-right" />
                                      </span>
                                      <span
                                        className="pcoded-mtext"
                                        data-i18n="nav.basic-components.alert"
                                      >
                                        {submenu.name}
                                      </span>
                                      <span className="pcoded-mcaret" />
                                    </Link>
                                  </li>
                                );
                              }
                            )
                          : null}
                      </ul>
                    </>
                  ) : null}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
