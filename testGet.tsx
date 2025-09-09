import * as React from 'react';
import { Web } from "sp-pnp-js";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import * as globalCommon from "../../globalComponents/globalCommon";
import { SlArrowDown, SlArrowRight } from 'react-icons/sl';
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineUp } from 'react-icons/ai';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Tooltip from '../Tooltip';
import PreSetDatePikerPannel from './PreSetDatePiker';
import TeamSmartFavoritesCopy from './Smart Favrorites/TeamSmartFavoritesCopy';
import { myContextValue } from '../globalCommon';
import * as Moment from "moment";
import ServiceComponentPortfolioPopup from '../EditTaskPopup/ServiceComponentPortfolioPopup';
import SmartfilterSettingTypePanel from './SmartfilterSettingTypePanel';
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import PageLoader from '../pageLoader';
import { Avatar } from "@fluentui/react-components"
import { devError } from '../../common/Utils';
let filterGroupsDataBackup: any = [];
let filterGroupData1: any = [];
let timeSheetConfig: any = {};
const TeamSmartFilter = (item: any) => {
    let MyContextdata: any = React.useContext(myContextValue);
    const [progressBar, setprogressBar] = React.useState(true)
    let web = new Web(item?.ContextValue?.Context?.pageContext?._web?.absoluteUrl + '/');
    let allMasterTasksData: any = item?.AllMasterTasksData;
    let allTastsData: any = item?.AllSiteTasksData;
    let AllSiteTasksDataLoadAll = item?.AllSiteTasksDataLoadAll;
    let smartFiltercallBackData = item?.smartFiltercallBackData;
    let ContextValue = item?.ContextValue;
    let portfolioColor: any = item?.portfolioColor
    let AllProjectBackupArray: any = []
    let isUpdatedTaskValue:any=item?.isUpdatedTaskValue
    try {
        if (item?.ProjectData == undefined)
            item.ProjectData = [];
        AllProjectBackupArray = JSON.parse(JSON.stringify(item?.ProjectData));
    } catch (e) {
        devError(e, "Oops! Something went wrong.");;
    }
    const [loadeAllData, setLoadeAllData] = React.useState(false)
    const [PreSetPanelIsOpen, setPreSetPanelIsOpen] = React.useState(false);
    const [TaskUsersData, setTaskUsersData] = React.useState([]);
    const [selectedUsers, setSelectedUsers] = React.useState<any[]>([]);
    const [AllUsers, setTaskUser] = React.useState([]);
    const [smartmetaDataDetails, setSmartmetaDataDetails] = React.useState([])
    const [expanded, setExpanded] = React.useState([]);
    const [filterGroupsData, setFilterGroups] = React.useState([]);
    const [allStites, setAllStites] = React.useState([]);
    const [portfolioTypeHeadingValue, setPortfolioTypeHeading] = React.useState<any>([]);
    const [allFilterClintCatogryData, setFilterClintCatogryData] = React.useState([]);
    const [CategoriesandStatusInfo, setCategoriesandStatusInfo] = React.useState('');
    const [sitesCountInfo, setsitesCountInfo] = React.useState('');
    const [projectCountInfo, setprojectCountInfo] = React.useState('');
    const [clientCategoryCountInfo, setclientCategoryCountInfo] = React.useState('');
    const [teamMembersCountInfo, setteamMembersCountInfo] = React.useState('');
    const [dateCountInfo, setdateCountInfo] = React.useState('');
    const [isSmartFevShowHide, setIsSmartFevShowHide] = React.useState(false);
    const rerender = React.useReducer(() => ({}), {})[1]
    const [flatView, setFlatView] = React.useState(false);

    const [IsSmartfilter, setIsSmartfilter] = React.useState(false);
    const [isSitesExpendShow, setIsSitesExpendShow] = React.useState(false);
    const [isClientCategory, setIsClientCategory] = React.useState(false);
    const [isKeywordsExpendShow, setIsKeywordsExpendShow] = React.useState(false);
    const [isProjectExpendShow, setIsProjectExpendShow] = React.useState(false);
    const [iscategoriesAndStatusExpendShow, setIscategoriesAndStatusExpendShow] = React.useState(false);
    const [isTeamMembersExpendShow, setIsTeamMembersExpendShow] = React.useState(false);
    const [isDateExpendShow, setIsDateExpendShow] = React.useState(false);
    const [isDateExpendShowWorkingAction, setIsDateExpendShowWorkingAction] = React.useState(false);
    const [isEveryOneShow, setIsEveryOneShow] = React.useState(false);
    const [isOnlyMeShow, setIsOnlyMeShow] = React.useState(false);
    const [isActionsExpendShow, setIsActionsExpendShow] = React.useState(false);
    const [isTeamMemberActivities, setIsTeamMemberActivities] = React.useState(false);

    const [collapseAll, setcollapseAll] = React.useState(true);
    const [iconIndex, setIconIndex] = React.useState(0);
    const [finalArray, setFinalArray] = React.useState([])
    const [updatedSmartFilter, setUpdatedSmartFilter] = React.useState(false)
    const [firstTimecallFilterGroup, setFirstTimecallFilterGroup] = React.useState(false)
    const [hideTimeEntryButton, setHideTimeEntryButton] = React.useState(0);
    // const [timeEntryDataLocalStorage, setTimeEntryDataLocalStorage] = React.useState<any>(localStorage.getItem('timeEntryIndex'));
    //*******************************************************Project Section********************************************************************/
    const [ProjectManagementPopup, setProjectManagementPopup] = React.useState(false);
    const [ProjectSearchKey, setProjectSearchKey] = React.useState('');
    let [selectedProject, setSelectedProject] = React.useState([]);
    const [SearchedProjectData, setSearchedProjectData] = React.useState([]);
    const [AllProjectData, SetAllProjectData] = React.useState([]);
    const [AllProjectSelectedData, setAllProjectSelectedData] = React.useState([]);
    //*******************************************************Project Section End********************************************************************/

    //*******************************************************Date Section********************************************************************/
    const [selectedFilter, setSelectedFilter] = React.useState("");
    const [startDate, setStartDate] = React.useState<any>(null);
    const [endDate, setEndDate] = React.useState<any>(null);
    const [isCreatedDateSelected, setIsCreatedDateSelected] = React.useState(false);
    const [isModifiedDateSelected, setIsModifiedDateSelected] = React.useState(false);
    const [isDueDateSelected, setIsDueDateSelected] = React.useState(false);
    // const [preSet, setPreSet] = React.useState(false);
    //*******************************************************Working Action Section********************************************************************/
    const [selectedFilterWorkingAction, setSelectedFilterWorkingAction] = React.useState("");
    const [startDateWorkingAction, setStartDateWorkingAction] = React.useState<any>(null);
    const [endDateWorkingAction, setEndDateWorkingAction] = React.useState<any>(null);
    const [isWorkingDate, setIsWorkingDate] = React.useState(false);
    const [changeInDatePicker, setChangeDatePicker] = React.useState(false)
    //*******************************************************Working Action Section End********************************************************************/
    //*******************************************************Date Section End********************************************************************/


    //*******************************************************Teams Section********************************************************************/
    const [isCreatedBy, setIsCreatedBy] = React.useState(false);
    const [isModifiedby, setIsModifiedby] = React.useState(false);
    const [isAssignedto, setIsAssignedto] = React.useState(false);
    const [isTeamLead, setIsTeamLead] = React.useState(false);
    const [isTeamMember, setIsTeamMember] = React.useState(false);
    const [isTodaysTask, setIsTodaysTask] = React.useState(false);
    const [isSelectAll, setIsSelectAll] = React.useState(false);
    const [isPhone, setIsPhone] = React.useState(false);
    const [isBottleneck, setIsBottleneck] = React.useState(false);
    const [isAttention, setIsAttention] = React.useState(false);
    //*******************************************************Teams Section End********************************************************************/

    //*******************************************************Key Word Section********************************************************************/
    const [selectedKeyWordFilter, setKeyWordSelected] = React.useState("Allwords");
    const [selectedKeyDefultTitle, setSelectedKeyDefultTitle] = React.useState("Title");
    const [keyWordSearchTearm, setKeyWordSearchTearm] = React.useState("");
    //*******************************************************Key Word Section End********************************************************************/
    //*************************************************** Portfolio Items & Task Items selected ***************************************************************** */
    const [isPortfolioItems, setIsPortfolioItems] = React.useState(true);
    const [isTaskItems, setIsTaskItems] = React.useState(true);
    const [smartFilterTypePannel, setSmartFilterTypePannel] = React.useState(false)
    //*************************************************** Portfolio Items & Task Items End ***************************************************************** */
    const [selectedFilterPanelIsOpen, setSelectedFilterPanelIsOpen] = React.useState(false);
    const [selectedFilterPanelIsOpenUpdate, setSelectedFilterPanelIsOpenUpdate] = React.useState(false);
    const [EveryoneSmartFavorites, setEveryoneSmartFavorites] = React.useState<any[]>([]);
    const [CreateMeSmartFavorites, setCreateMeSmartFavorites] = React.useState<any[]>([]);
    const [SmartFavoritesItemsQueryStringBased, setSmartFavoritesItemsQueryStringBased] = React.useState<any[]>([]);
    const [SmartFavoritesItemsQueryStringBasedBackup, setSmartFavoritesItemsQueryStringBasedBackup] = React.useState<any[]>([]);
    const [itemsQueryBasedCall, setItemsQueryBasedCall] = React.useState(false);
    const [updatedEditData, setUpdatedEditData] = React.useState({});
    const[IsFirstimeCustomeDate,setIsFirstimeCustomeDate]= React.useState(false);
    //*************************************************** WorkingActions Sections ***************************************************************** */
    const [isWorkingActions, setIsWorkingActions] = React.useState([]);
    //*************************************************** WorkingActions Sections ***************************************************************** */

    ///// Year Range Using Piker ////////
    const [years, setYear] = React.useState([])
    const [months, setMonths] = React.useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",])
    React.useEffect(() => {
        const currentYear = new Date().getFullYear();
        const year: any = [];
        for (let i = 1990; i <= currentYear; i++) {
            year.push(i);
        }
        setYear(year);

    }, [])

    React.useEffect(() => {
        setTimeout(() => {
            const panelMain: any = document.querySelector('.ms-Panel-main');
            if (panelMain && item?.portfolioColor) {
                $('.ms-Panel-main').css('--SiteBlue', item?.portfolioColor
                ); // Set the desired color value here
            }
        }, 1000)
    }, [PreSetPanelIsOpen, selectedFilterPanelIsOpenUpdate, selectedFilterPanelIsOpen, ProjectManagementPopup]);
      React.useEffect(() => {
       if (isUpdatedTaskValue === true) {
    FilterDataOnCheck();
        item.setIsUpdatedTaskValue(false)

  }
      },[isUpdatedTaskValue])

    ///// Year Range Using Piker end////////

    const getTaskUsers = () => {
        let taskUsers = [];
        let results: any = [];
        if (item?.AllUsers?.length > 0) {
            results = item?.AllUsers;
        }
        for (let index = 0; index < results.length; index++) {
            let element = results[index];
            element.value = element.Id;
            element.label = element.Title;
            if (element.UserGroupId == undefined && element.Title != "QA" && element.Title != "Design") {
                element.values = [],
                    element.checked = [],
                    element.checkedObj = [],
                    element.expanded = []
                getChilds(element, results);
                taskUsers.push(element);
            }
        }
        taskUsers = taskUsers?.sort((elem1: any, elem2: any) => elem1.SortOrder - elem2.SortOrder);
        setTaskUser(results);
        setTaskUsersData(taskUsers);
    }
    const getChilds = (item: any, items: any) => {
        for (let index = 0; index < items.length; index++) {
            let childItem = items[index];
            if (childItem.UserGroupId != undefined && parseInt(childItem.UserGroupId) == item.ID) {
                childItem.value = childItem.Id;
                childItem.label = childItem.Title;
                item.values.push(childItem)
                getChilds(childItem, items);
            }
        }
    }
    const GetSmartmetadata = () => {
        const allMetadata = item?.AllMetadata ?? [];
        const hasMetadata = allMetadata.length > 0;
        const updatedMetadata = hasMetadata
            ? [...allMetadata, {
                Title: "Other",
                TaxType: "Categories",
                ParentID: 0,
                Id: 0,
            },{
                Title: "Other",
                TaxType: "Priority",
                ParentID: 0,
                Id: 0,
            }]
            : [];

        setSmartmetaDataDetails(updatedMetadata);
    };
    const ChckSmartTimeIsAvalable = async () => {
        // await globalCommon.smartTimeUseStorage(item);
        getTaskUsers();
        GetSmartmetadata();
        setprogressBar(false)
    }
    const loadAdminConfigurationsId = async (itemId: any) => {
        try {
            let configurationData: any[] = [];
            const resultsArray = await Promise.all([
                await web.lists
                    .getById(item?.ContextValue?.AdminconfigrationID)
                    .items.getById(parseInt(itemId)).select('Id', 'Title', 'Value', 'Key', 'Description', 'DisplayTitle', 'Configurations').get()
            ]);
            resultsArray.forEach((smart: any) => {
                if (smart.Configurations !== undefined) {
                    configurationData = JSON.parse(smart.Configurations);
                    configurationData.map((elem) => {
                        elem.Id = smart.Id;
                        if (elem.startDate != null && elem.startDate != undefined && elem.startDate != "") {
                            elem.startDate = new Date(elem.startDate);
                        }
                        if (elem.endDate != null && elem.endDate != undefined && elem.endDate != "") {
                            elem.endDate = new Date(elem.endDate);
                        }
                        if (elem.startDateWorkingAction != null && elem.startDateWorkingAction != undefined && elem.startDateWorkingAction != "") {
                            elem.startDateWorkingAction = new Date(elem.startDateWorkingAction);
                        }
                        if (elem.endDateWorkingAction != null && elem.endDateWorkingAction != undefined && elem.endDateWorkingAction != "") {
                            elem.endDateWorkingAction = new Date(elem.endDateWorkingAction);
                        }
                    })
                }
            });
            let allMasterTaskDataFlatLoadeViewBackup = JSON.parse(JSON.stringify(configurationData));
            setSmartFavoritesItemsQueryStringBasedBackup(allMasterTaskDataFlatLoadeViewBackup);
            let SmartFavoritesItemsQueryStringBasedTableConfigValue = [];
            SmartFavoritesItemsQueryStringBasedTableConfigValue.push(configurationData[0]?.smartFabBasedColumnsSetting);
            if (item?.setSmartFabBasedColumnsSetting != undefined)
                item?.setSmartFabBasedColumnsSetting(SmartFavoritesItemsQueryStringBasedTableConfigValue)
            setSmartFavoritesItemsQueryStringBased(configurationData);
        } catch (error) {
             devError(error, "Oops! Something went wrong.");;
        }
    }
    React.useEffect(() => {
        if (item?.IsSmartfavoriteId != "" && item?.IsSmartfavoriteId != undefined && item?.IsSmartfavoriteId != null) {
            setFlatView(true);
            setUpdatedSmartFilter(true);
            loadAdminConfigurationsId(item?.IsSmartfavoriteId);
            setprogressBar(false)
        } else {
            ChckSmartTimeIsAvalable();
        }
    }, [])
    React.useEffect(() => {
        if (smartmetaDataDetails?.length > 0) {
            GetfilterGroups();
        }
    }, [smartmetaDataDetails]);

    React.useEffect(() => {
        if (filterGroupsData[0]?.checked?.length > 0 && firstTimecallFilterGroup === true) {
            headerCountData();
            FilterDataOnCheck();
        }
    }, [filterGroupsData && firstTimecallFilterGroup]);

    React.useEffect(() => {
        if (SmartFavoritesItemsQueryStringBased.length > 0) {
            setFilterGroups((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.filterGroupsData);
            setFilterClintCatogryData((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.allFilterClintCatogryData);
            setAllStites((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.allStites);
            setIsWorkingActions((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isWorkingActions);
            setSelectedProject((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.selectedProject);
            setIsCreatedBy((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isCreatedBy);
            setIsModifiedby((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isModifiedby);
            setIsAssignedto((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isAssignedto);
            setIsTeamLead((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isTeamLead);
            setIsTeamMember((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isTeamMember);
            setIsTodaysTask((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isTodaysTask);
            setIsPhone((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isPhone);
            setIsBottleneck((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isBottleneck);
            setIsAttention((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isAttention);
            setSelectedFilter((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.selectedFilter);
            setSelectedFilterWorkingAction((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.selectedFilterWorkingAction)
            setIsCreatedDateSelected((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isCreatedDateSelected);
            setIsModifiedDateSelected((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isModifiedDateSelected);
            setIsDueDateSelected((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isDueDateSelected);
            setTaskUsersData((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.TaskUsersData);
            setStartDateWorkingAction((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.startDateWorkingAction);
            setEndDateWorkingAction((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.endDateWorkingAction);
            setIsWorkingDate((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.isWorkingDate);
             setStartDate((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.startDate);
            setEndDate((prev: any) => SmartFavoritesItemsQueryStringBased[0]?.endDate);
             setChangeDatePicker(true)
             setIsFirstimeCustomeDate(true)
            setItemsQueryBasedCall(true);
        }
    }, [SmartFavoritesItemsQueryStringBased]);

    React.useEffect(() => {
        if (filterGroupsData[0]?.checked?.length > 0 && itemsQueryBasedCall === true) {
            if (item?.LoadAllSiteTasksAllData && loadeAllData === false) {
                let CheckSatusGTNinty: any = filterGroupsData.filter((stat) => stat.Title === "Status")
                const checkCallData: any = CheckSatusGTNinty[0]?.checkedObj?.some((elem: any) => {
                    if (elem.Title === '90% Task completed' || elem.Title === '93% For Review' || elem.Title === '96% Follow-up later' || elem.Title === '99% Completed' || elem.Title === '99% Completed') {
                        return true
                    }
                    return false;
                })
                if (checkCallData === true) {
                    item?.setLoaded(false);
                    fetchAllDataAboveNinty();
                } else {
                    if (AllSiteTasksDataLoadAll?.length > 0) {
                        allTastsData = [];
                        allTastsData = allTastsData.concat(AllSiteTasksDataLoadAll);
                    }
                    FilterDataOnCheck();
                    headerCountData();
                }
            } else {
                if (AllSiteTasksDataLoadAll?.length > 0) {
                    allTastsData = [];
                    allTastsData = allTastsData.concat(AllSiteTasksDataLoadAll);
                }
                FilterDataOnCheck();
                headerCountData();
            }
        }
    }, [itemsQueryBasedCall, filterGroupsData])
    const fetchAllDataAboveNinty = async () => {
        const fetchAllData = await item?.LoadAllSiteTasksAllData();
        if (fetchAllData != undefined) {
            setLoadeAllData(true);
            if (fetchAllData?.length > 0) {
                allTastsData = [];
                allTastsData = allTastsData.concat(fetchAllData);
            }
            FilterDataOnCheck();
            headerCountData();
        }
    }


    let filterGroups: any = [{ Title: 'Type', values: [], checked: [], checkedObj: [], expanded: [], selectAllChecked: true, ValueLength: 0 },
    {
        Title: 'Status', values: [], checked: [], checkedObj: [], expanded: [], ValueLength: 0
    }, {
        Title: 'Priority', values: [], checked: [], checkedObj: [], expanded: [], selectAllChecked: true, ValueLength: 0
    }, {
        Title: 'Categories', values: [], checked: [], checkedObj: [], expanded: [], selectAllChecked: false, ValueLength: 0
    },
    {
        Title: 'Smart Activites', values: [], checked: [], checkedObj: [], expanded: [], selectAllChecked: false, ValueLength: 0
    }
    ];
    let portfolioTypeHeading: any = [];
    let AllSites: any = [];
    const clintCatogryData: any = [];
    const SortOrderFunction = (filterGroups: any) => {
        filterGroups.forEach((elem: any) => {
            return elem?.values?.sort((a: any, b: any) => a.SortOrder - b.SortOrder);
        });
    };
    const GetfilterGroups = () => {
        let SitesData: any = [];
        let ClientCategory: any = [];
        let workingActionsValueGrouped: any = [{ Title: 'Working Action', values: [], checked: [], checkedObj: [], expanded: [], selectAllChecked: true, ValueLength: 0 }];
        let workingActionsValue: any = [];
        let clintCategoryGroupedData: any = [];
        let PriorityData: any = [];
        let PrecentComplete: any = [];
        let Categories: any = [];
        let Type: any = [];
        let portfolioTypeHeadingData: any = [];
        let smartActivityInfo: any = [];
        smartmetaDataDetails.forEach((element: any) => {
            element.label = element.Title;
            element.value = element.Id;
            if (element.TaxType == 'Task Types') {
                portfolioTypeHeadingData.push(element)
            }
            if (element.TaxType == 'Type') {
                portfolioTypeHeadingData.push(element)
            }
            if (element.TaxType == 'Task Types') {
                Type.push(element)
            }
            if (element.TaxType == 'Type') {
                Type.push(element)
            }
            if (element.TaxType == 'Sites' || element.TaxType == 'Sites Old') {
                SitesData.push(element);
            }
            if (element?.TaxType == 'Client Category') {
                ClientCategory.push(element);
            }
            if (element.TaxType == "Priority") {
                PriorityData.push(element);
            }
            if (element.TaxType == 'Percent Complete') {
                PrecentComplete.push(element);
            }
            if (element.TaxType == 'Categories') {
                Categories.push(element);
            }
            if (element?.TaxType == 'Activities') {
                smartActivityInfo.push(element);
            }
            if (element?.TaxType == 'WorkingAction') {
                workingActionsValue.push(element);
            }
            if (element?.TaxType == 'timesheetListConfigrations') {
                timeSheetConfig = element;
            }
        });

        PriorityData = PriorityData?.sort((elem1: any, elem2: any) => parseInt(elem2.SortOrder) - parseInt(elem1.SortOrder));
        Type = Type?.sort((elem1: any, elem2: any) => parseInt(elem1.SortOrder) - parseInt(elem2.SortOrder));
        ClientCategory?.forEach((elem: any) => {
            if (elem?.Title != 'Master Tasks' && ((elem?.Parent == undefined || elem?.Parent?.Id == undefined || elem?.Parent?.Id == 0))) {
                elem.values = [],
                    elem.checked = [],
                    elem.checkedObj = [],
                    elem.expanded = []
                clintCategoryGroupedData.push(elem);
                getChildsBasedOn(elem, ClientCategory);
            }
        })

        if (clintCategoryGroupedData.length > 0) {
            clintCategoryGroupedData.map((e: any) => {
                const catogryValue: any = {
                    "Title": e.Title,
                    "checkedObj": [],
                    "expanded": [],
                    "values": [],
                    "ValueLength": 0,
                };
                if (e.children !== undefined && e.children.length > 0) {
                    catogryValue.values = e.children.filter((child: any) => child.Id !== undefined);
                }
                catogryValue.ValueLength = countNestedChildren(e.children); // Count all nested children
                clintCatogryData.push(catogryValue);
            })
        }
        function countNestedChildren(children: any) {
            let count = 0;
            children?.forEach((child: any) => {
                count += 1; // Increment for the current child
                if (child.children && child.children.length > 0) {
                    count += countNestedChildren(child.children); // Recursively count nested children
                }
            });
            return count;
        }

        if (clintCatogryData?.length > 0) {
            clintCatogryData.forEach((elem: any) => {
                if (elem.Title === "Other") {
                    const Blank: any = { Id: 0, Title: "Blank", value: 0, Parent: { Id: 576, Title: "Other" }, TaxType: "Client Category", ParentId: 576, ParentID: null, ID: 0, label: "Blank", checked: true };
                    elem.values.push(Blank);
                    elem.ValueLength = elem.ValueLength + 1;
                }
            });
        }
        let hasParent: any = false;
        const dummyParentId = -1;
        SitesData?.forEach((element: any) => {
            if (element.Title != 'Master Tasks' && element?.Parent && element?.Parent?.Id) {
                hasParent = true;
            }
        });
        if (!hasParent) {
            SitesData?.push({
                Title: "Task Lists",
                TaxType: 'Sites',
                ParentID: 0,
                Id: dummyParentId,
                ID: dummyParentId,
            });
            SitesData?.forEach((element: any) => {
                if ((element.Title != 'Master Tasks' && element.Title != 'Task Lists') && (!element?.Parent || !element?.Parent?.Id)) {
                    element.Parent = { Id: dummyParentId };
                    element.ParentID = dummyParentId
                    element.ParentId = dummyParentId
                }
            });
        }
        SitesData?.forEach((element: any) => {
            if (element.Title != 'Master Tasks' && (element?.Parent === undefined || element?.Parent?.Id == undefined || element?.Parent?.Id == 0)) {
                element.values = [],
                    element.checked = [],
                    element.checkedObj = [],
                    // element.selectAllChecked = true,
                    element.expanded = []
                AllSites.push(element);
                getChildsSites(element, SitesData);
            }
        })
        portfolioTypeHeadingData?.forEach((element: any) => {
            if (element.Title != 'Master Tasks' && (element?.Parent === undefined || element?.Parent?.Id == undefined || element?.Parent?.Id == 0)) {
                element.values = [],
                    element.checked = [],
                    element.checkedObj = [],
                    element.expanded = []
                portfolioTypeHeading.push(element);
                getChildsSites(element, portfolioTypeHeadingData);
            }
        })
        PrecentComplete = PrecentComplete?.sort((elem1: any, elem2: any) => elem1.SortOrder - elem2.SortOrder);
        PrecentComplete?.forEach((element: any) => {
            if ((element?.Parent === undefined || element?.Parent?.Id == undefined || element?.Parent?.Id == 0)) {
                element.value = element.Id;
                element.label = element.Title;
                filterGroups[1].ValueLength = PrecentComplete?.length;
                getChildsBasedOn(element, PrecentComplete);
                filterGroups[1].values.push(element);
            }
        })
        Type?.forEach((element: any) => {
            if ((element?.Parent === undefined || element?.Parent?.Id == undefined || element?.Parent?.Id == 0)) {
                element.value = element.Id;
                element.label = element.Title;
                element.selectAllChecked = true;
                filterGroups[0].ValueLength = Type?.length;
                getChildsBasedOn(element, Type);
                filterGroups[0].values.push(element);
            }
        })
        PriorityData?.forEach((element: any) => {
            if ((element?.Parent === undefined || element?.Parent?.Id == undefined)) {
                element.value = element.Id;
                element.label = element.Title;
                filterGroups[2].ValueLength = PriorityData?.length;
                getChildsBasedOn(element, PriorityData);
                filterGroups[2].values.push(element);
            }
        })
        Categories?.forEach((element: any) => {
            if ((element?.Parent === undefined || element?.Parent?.Id === undefined || element?.Parent?.Id === 0)) {
                element.value = element.Id;
                element.label = element.Title;
                filterGroups[3].ValueLength = Categories?.length;
                getChildsBasedOn(element, Categories);
                filterGroups[3].values.push(element);
            }
        })
        smartActivityInfo?.forEach((element: any) => {
            if ((element?.Parent === undefined || element?.Parent?.Id == undefined || element?.Parent?.Id === 0)) {
                element.value = element.Id;
                element.label = element.Title;
                filterGroups[4].ValueLength = smartActivityInfo?.length;
                getChildsBasedOn(element, PriorityData);
                filterGroups[4].values.push(element);
            }
        })
        workingActionsValue?.forEach((element: any) => {
            if ((element?.Parent === undefined || element?.Parent?.Id == undefined || element?.Parent?.Id == 0)) {
                element.value = element.Id;
                element.label = element.Title;
                workingActionsValueGrouped[0].ValueLength = workingActionsValue?.length;
                getChildsBasedOn(element, workingActionsValue);
                workingActionsValueGrouped[0].values.push(element);
            }
        })
        workingActionsValueGrouped?.forEach((element: any, index: any) => {
            element.checkedObj = GetCheckedObject(element.values, element.checked)
        });
        filterGroups.forEach((element: any, index: any) => {
            element.checkedObj = GetCheckedObject(element.values, element.checked)
        });
        AllSites?.forEach((element: any, index: any) => {
            element.checkedObj = GetCheckedObject(element.values, element.checked)
        });
        portfolioTypeHeading?.forEach((element: any, index: any) => {
            element.checkedObj = GetCheckedObject(element.values, element.checked)
        });
        clintCatogryData?.forEach((element: any, index: any) => {
            element.checkedObj = GetCheckedObject(element.values, element.checked)
        });
        setFilterClintCatogryData(clintCatogryData)
        setAllStites(AllSites);
        setIsWorkingActions(workingActionsValueGrouped);
        setPortfolioTypeHeading(portfolioTypeHeading);
        SortOrderFunction(filterGroups);
        setFilterGroups(filterGroups);
        filterGroupsDataBackup = JSON.parse(JSON.stringify(filterGroups));
        filterGroupData1 = JSON.parse(JSON.stringify(filterGroups));
        rerender();
        // getFilterInfo();
        if (filterGroups[0]?.checked?.length > 0) {
            setFirstTimecallFilterGroup(true);
        }
    }
    const getChildsSites = (item: any, items: any) => {
        for (let index = 0; index < items.length; index++) {
            let childItem = items[index];
            if (childItem.Parent != undefined && childItem.Parent.Id != undefined && parseInt(childItem.Parent.Id) == item.ID) {
                item.values = item.values === undefined ? [] : item.values;
                childItem.value = childItem.Id;
                childItem.label = childItem.Title;
                item.values.push(childItem)
                if (item.TaxType == 'Sites' || item.TaxType == 'Sites Old') {
                    if (childItem.Title == "Shareweb Old" || childItem.Title == "DRR" || childItem.Title == "Small Projects" || childItem.Title == "Offshore Tasks" || childItem.Title == "Health" || childItem.Title == "Gender" || childItem.Title == "QA" || childItem.Title == "DE" || childItem.Title == "Completed" || childItem.Title == "90%" || childItem.Title == "93%" || childItem.Title == "96%" || childItem.Title == "100%") {
                    }
                    else {
                        item.checked.push(childItem.Id);
                    }
                } else {
                    item.checked.push(childItem.Id);
                }
                // item.checked.push(childItem?.Id)
                getChildsSites(childItem, items);
            }
        }
    }
    const getChildsBasedOn = (item: any, items: any) => {
        item.children = [];
        for (let index = 0; index < items.length; index++) {
            let childItem = items[index];
            if (childItem.Parent != undefined && childItem.Parent.Id != undefined && parseInt(childItem.Parent.Id) == item.ID) {
                childItem.value = childItem.Id;
                childItem.label = childItem.Title;
                item.children.push(childItem);
                getChildsBasedOn(childItem, items);
            }
        }
        if (item.children.length == 0) {
            delete item.children;
        }
        if (item.TaxType == 'Percent Complete') {
            if (item.Title == "Completed" || item.Title == "90% Task completed" || item.Title == "93% For Review" || item.Title == "96% Follow-up later" || item.Title == "100% Closed" || item.Title == "99% Completed") {
            }
            else {
                filterGroups[1].checked.push(item.Id);
            }
        }
        if (item.TaxType == 'Priority') {
            filterGroups[2].checked.push(item.Id)
        }
        if (item.TaxType == 'Categories') {
            if (item.Title == "Draft") {

            } else {
                filterGroups[3].checked.push(item.Id)
            }
        }
        if (item.TaxType == 'Task Types' || item.TaxType == "Type") {
            filterGroups[0].checked.push(item.Id)
        }
    }
    const headerCountData = (() => {
        let filterInfo = '';
        let CategoriesandStatus = "";
        let sitesCount = "";
        let projectCount = "";
        let clientCategoryCount = "";
        let teamMembersCount = "";
        let dateCount = "";
        let CategoriesandStatusInfo: any = [];
        let sitesCountInfo: any = [];
        let projectCountInfo: any = [];
        let clientCategoryCountInfo: any = [];
        let teamMembersCountInfo: any = [];
        let dateCountInfo: any = [];
        if (filterGroupsData?.length > 0) {
            filterGroupsData?.forEach((element: any) => {
                if (element?.checked?.length > 0) {
                    if (element?.selectAllChecked === true || element?.checked?.length === element?.ValueLength) {
                        CategoriesandStatusInfo.push(element.Title + ': (' + "all" + ')')
                    } else {
                        CategoriesandStatusInfo.push(element.Title + ': (' + element.checked.length + ')')
                    }
                }
            });
            CategoriesandStatus = CategoriesandStatusInfo.join(' | ');
        }
        if (allStites?.length > 0) {
            allStites?.forEach((element: any) => {
                if (element?.checked?.length > 0) {
                    if (element?.selectAllChecked === true) {
                        sitesCountInfo.push(element.Title + ': (' + "all" + ')')
                    } else {
                        sitesCountInfo.push(element.Title + ': (' + element.checked.length + ')')
                    }
                }
            });
            sitesCount = sitesCountInfo.join(' | ');
        }

        if (allFilterClintCatogryData?.length > 0) {
            allFilterClintCatogryData?.forEach((element: any) => {
                if (element?.checked?.length > 0) {
                    if (element?.selectAllChecked === true || element?.checked?.length === element?.ValueLength) {
                        clientCategoryCountInfo.push(element.Title + ': (' + "all" + ')')
                    } else {
                        clientCategoryCountInfo.push(element.Title + ': (' + element.checked.length + ')')
                    }
                }
            });
            clientCategoryCount = clientCategoryCountInfo.join(' | ');
        }
        if (selectedProject?.length > 0) {
            projectCountInfo.push("Project" + ': (' + selectedProject?.length + ')')
            projectCount = projectCountInfo.join(' | ');
        }
        if (TaskUsersData?.length > 0) {
            TaskUsersData?.forEach((element: any) => {
                if (element?.checked?.length > 0) {
                    if (element?.selectAllChecked === true) {
                        teamMembersCountInfo.push(element.Title + ': (' + "all" + ')')
                    } else {
                        teamMembersCountInfo.push(element.Title + ': (' + element.checked.length + ')')
                    }
                }
            });
            teamMembersCount = teamMembersCountInfo.join(' | ');
        }
        let trueCount = 0;
        if (isCreatedDateSelected) {
            trueCount++;
        }
        if (isModifiedDateSelected) {
            trueCount++;
        }
        if (isDueDateSelected) {
            trueCount++;
        }
        if (trueCount > 0) {
            dateCountInfo.push("Date" + ': (' + trueCount + ')')
            dateCount = dateCountInfo.join(' | ');
        }
        setCategoriesandStatusInfo(CategoriesandStatus)
        setsitesCountInfo(sitesCount)
        setprojectCountInfo(projectCount)
        setclientCategoryCountInfo(clientCategoryCount)
        setteamMembersCountInfo(teamMembersCount)
        setdateCountInfo(dateCount);
    })
    React.useEffect(() => {
        headerCountData()
    }, [selectedProject, isCreatedDateSelected, isModifiedDateSelected, isDueDateSelected])

    const onCheck = async (checked: any, index: any, event: any) => {
        if (event == "filterSites") {
            let filterGroups = allStites;
            filterGroups[index].checked = checked;
            filterGroups[index].checkedObj = GetCheckedObject(filterGroups[index].values, checked)
            if (filterGroups[index]?.values.length > 0) {
                const childrenLength = filterGroups[index]?.values?.reduce((total: any, obj: any) => total + (obj?.children?.length || 0), 0) + (filterGroups[index]?.values?.length ? filterGroups[index]?.values?.length : 0);
                filterGroups[index].selectAllChecked = childrenLength === checked?.length;
            }
            setAllStites(filterGroups);
            rerender();

        } else if (event == "FilterCategoriesAndStatus") {
            let filterGroups = filterGroupsData;
            filterGroups[index].checked = checked;
            filterGroups[index].checkedObj = GetCheckedObject(filterGroups[index].values, checked)
            // //// demo////
            if (filterGroups[index]?.values.length > 0) {
                const childrenLength = filterGroups[index]?.values?.reduce((total: any, obj: any) => total + (obj?.children?.length || 0), 0) + (filterGroups[index]?.values?.length ? filterGroups[index]?.values?.length : 0);
                filterGroups[index].selectAllChecked = childrenLength === checked?.length;
            }
            if (item?.LoadAllSiteTasksAllData && loadeAllData === false) {
                const checkCallData: any = filterGroups[index].checkedObj.some((elem: any) => {
                    if (elem.Title === '90% Task completed' || elem.Title === '93% For Review' || elem.Title === '96% Follow-up later' || elem.Title === '99% Completed' || elem.Title === '99% Completed') {
                        return true
                    }
                    return false
                })
                if (checkCallData === true) {
                    item?.setLoaded(false);
                    const fetchData = await item?.LoadAllSiteTasksAllData();
                    if (fetchData?.length === 0) {
                        item?.setLoaded(true);
                    }
                    setLoadeAllData(true);
                }
            }
            // ///end///
            setFilterGroups(filterGroups);
            rerender();

        } else if (event == "FilterTeamMembers") {
            let filterGroups = TaskUsersData;
            filterGroups[index].checked = checked;
            filterGroups[index].checkedObj = GetCheckedObject(filterGroups[index].values, checked)
            // //// demo////
            if (filterGroups[index]?.values.length > 0) {
                const childrenLength = filterGroups[index]?.values?.reduce((total: any, obj: any) => total + (obj?.children?.length || 0), 0) + (filterGroups[index]?.values?.length ? filterGroups[index]?.values?.length : 0);
                filterGroups[index].selectAllChecked = childrenLength === checked?.length;
            }
            // ///end///
            handleTeamsFilterCreatedModifiAssign(event);
            setTaskUsersData(filterGroups);
            rerender();

        } else if (event == "ClintCatogry") {
            let filterGroups = allFilterClintCatogryData;
            filterGroups[index].checked = checked;
            filterGroups[index].checkedObj = GetCheckedObject(filterGroups[index].values, checked)
            // //// demo////
            if (filterGroups[index]?.values.length > 0) {
                const childrenLength = filterGroups[index]?.values?.reduce((total: any, obj: any) => total + (obj?.children?.length || 0), 0) + (filterGroups[index]?.values?.length ? filterGroups[index]?.values?.length : 0);
                filterGroups[index].selectAllChecked = childrenLength === checked?.length;
            }
            // ///end///
            setFilterClintCatogryData((prev: any) => filterGroups);
            rerender();
        } else if (event == "WorkingAction") {
            let filterGroups = isWorkingActions;
            filterGroups[index].checked = checked;
            filterGroups[index].checkedObj = GetCheckedObject(filterGroups[index].values, checked)
            if (filterGroups[index]?.values.length > 0) {
                const childrenLength = filterGroups[index]?.values?.reduce((total: any, obj: any) => total + (obj?.children?.length || 0), 0) + (filterGroups[index]?.values?.length ? filterGroups[index]?.values?.length : 0);
                filterGroups[index].selectAllChecked = childrenLength === checked?.length;
            }
            setIsWorkingActions(filterGroups);
            rerender();

        }
        rerender()
        headerCountData();
    }
    const handleTeamsFilterCreatedModifiAssign = (event: any) => {
        if (
            !isCreatedBy &&
            !isModifiedby &&
            !isAssignedto
        ) {
            switch (event) {
                case "FilterTeamMembers":
                    setIsCreatedBy(true);
                    setIsModifiedby(true);
                    setIsAssignedto(true);
                    break;
                default:
                    setIsCreatedBy(false);
                    setIsModifiedby(false);
                    setIsAssignedto(false);
                    break;
            }
        }
    };
    const handleSelectAllChangeTeamSection = () => {
        setIsSelectAll(!isSelectAll);
        setIsCreatedBy(!isSelectAll);
        setIsModifiedby(!isSelectAll);
        setIsAssignedto(!isSelectAll);
        setIsTeamLead(!isSelectAll);
        setIsTeamMember(!isSelectAll);
        setIsTodaysTask(!isSelectAll);
    };

    const GetCheckedObject = (arr: any, checked: any) => {
        let checkObj: any = [];
        checked?.forEach((value: any) => {
            arr?.forEach((element: any) => {
                if (value == element.Id) {
                    checkObj.push({
                        Id: element.ItemType === "User" ? element?.AssingedToUser?.Id : element.Id,
                        Title: element.Title,
                        TaxType: element.TaxType ? element.TaxType : ''
                    })
                }
                if (element.children != undefined && element.children.length > 0) {
                    element.children.forEach((chElement: any) => {
                        if (value == chElement.Id) {
                            checkObj.push({
                                Id: chElement.ItemType === "User" ? chElement?.AssingedToUser?.Id : chElement.Id,
                                Title: chElement.Title,
                                TaxType: element.TaxType ? element.TaxType : ''
                            })
                        }
                    });
                }
            });
        });
        return checkObj;
    }
    const handleSelectAll = (index: any, selectAllChecked: any, event: any) => {
        if (event == "filterSites") {
            let filterGroups = [...allStites];
            filterGroups[index].selectAllChecked = selectAllChecked;
            let selectedId: any = [];
            filterGroups[index].values.forEach((item: any) => {
                item.checked = selectAllChecked;
                if (selectAllChecked) {
                    selectedId.push(item?.Id)
                }
                item?.children?.forEach((chElement: any) => {
                    if (selectAllChecked) {
                        selectedId.push(chElement?.Id)
                    }
                });
            });
            filterGroups[index].checked = selectedId;
            filterGroups[index].checkedObj = GetCheckedObject(filterGroups[index].values, selectedId);
            setAllStites((prev: any) => filterGroups);
            rerender()
        } else if (event == "FilterCategoriesAndStatus") {
            let filterGroups = [...filterGroupsData];
            const selectedIds: any[] = [];

            const processItem = (item: any) => {
                item.checked = selectAllChecked;
                if (selectAllChecked) {
                    selectedIds.push(item?.Id);
                }
                item?.children?.forEach((chElement: any) => {
                    processItem(chElement);
                });
            };
            filterGroups[index].selectAllChecked = selectAllChecked;
            filterGroups[index]?.values?.forEach((item: any) => {
                processItem(item);
            });
            filterGroups[index].checked = selectedIds;
            filterGroups[index].checkedObj = GetCheckedObject(filterGroups[index].values, selectedIds);
            setFilterGroups((prev: any) => filterGroups);
            rerender()
        } else if (event == "FilterTeamMembers") {
            let filterGroups = [...TaskUsersData];
            filterGroups[index].selectAllChecked = selectAllChecked;
            let selectedId: any = [];
            filterGroups[index].values.forEach((item: any) => {
                item.checked = selectAllChecked;
                if (selectAllChecked) {
                    selectedId.push(item?.Id)
                }
                item?.children?.forEach((chElement: any) => {
                    if (selectAllChecked) {
                        selectedId.push(chElement?.Id)
                    }
                });
            });
            filterGroups[index].checked = selectedId;
            filterGroups[index].checkedObj = GetCheckedObject(filterGroups[index].values, selectedId);
            setTaskUsersData((prev: any) => filterGroups);
            rerender()
        }
        else if (event === "ClintCatogry") {
            const filterGroups = [...allFilterClintCatogryData];
            const selectedIds: any[] = [];

            const processItem = (item: any) => {
                item.checked = selectAllChecked;
                if (selectAllChecked) {
                    selectedIds.push(item?.Id);
                }
                item?.children?.forEach((chElement: any) => {
                    processItem(chElement);
                });
            };

            filterGroups[index].selectAllChecked = selectAllChecked;
            filterGroups[index]?.values?.forEach((item: any) => {
                processItem(item);
            });
            filterGroups[index].checked = selectedIds;
            filterGroups[index].checkedObj = GetCheckedObject(filterGroups[index]?.values, selectedIds);
            setFilterClintCatogryData(filterGroups);
            rerender();
        }
        headerCountData();
    }
    const FilterDataOnCheck = function () {
        let portFolio: any[] = [];
        let site: any[] = [];
        let type: any[] = [];
        let teamMember: any[] = [];
        let priorityType: any[] = [];
        let percentComplete: any[] = [];
        let clientCategory: any[] = [];
        let Categories: any[] = [];
        let smartActivities: any = [];
        let workingActionCheckData: any[] = [];
        filterGroupsData?.forEach(function (filter) {
            if (filter.Title === 'Portfolio Type' && filter.checked.length > 0 && filter.checkedObj.length > 0) {
                filter.checkedObj.map(function (port: any) { return portFolio.push(port); });
            }
            else if (filter.Title === 'Task Type' && filter.checked.length > 0 && filter.checkedObj.length > 0) {
                filter.checkedObj.map(function (elem1: any) { return type.push(elem1); });
            }

            if (filter.Title === 'Type' && filter.checked.length > 0 && filter.checkedObj.length > 0) {
                filter?.checkedObj?.map((elem: any) => {
                    if (elem.TaxType === 'Task Types') {
                        portFolio.push(elem);
                    } else if (elem.TaxType === 'Type') {
                        type.push(elem);
                    }
                })
            }
            else if (filter.Title === 'Categories' && filter.checked.length > 0 && filter.checkedObj.length > 0) {
                filter.checkedObj.map(function (elem2: any) { return Categories.push(elem2); });
            }
            else if (filter.Title === 'Priority' && filter.checked.length > 0 && filter.checkedObj.length > 0) {
                filter.checkedObj.map(function (elem3: any) {
                    if (elem3.Title != '(1) High' && elem3.Title != '(2) Normal' && elem3.Title != '(3) Low'&& elem3.Title !='Other') {
                        elem3.Title = parseInt(elem3.Title);
                    }
                    priorityType.push(elem3);
                });
            }
            else if (filter.Title === 'Status' && filter.checked.length > 0 && filter.checkedObj.length > 0) {
                filter.checkedObj.map(function (elem4: any) {
                    if (elem4.Title) {
                        const match = elem4.Title.match(/(\d+)%/);
                        if (match) {
                            elem4.TaskStatus = parseInt(match[1]);
                        }
                    }
                    return percentComplete.push(elem4);
                });
            }
            else if (filter.Title === 'Smart Activites' && filter.checked.length > 0 && filter.checkedObj.length > 0) {
                filter.checkedObj.map(function (elem2: any) { return smartActivities.push(elem2); });
            }

        });
        if (allFilterClintCatogryData?.length > 0) {
            clientCategory = allFilterClintCatogryData?.reduce((acc, item) => [...acc, ...item.checkedObj], []);
        }
        if (isWorkingActions?.length > 0) {
            workingActionCheckData = isWorkingActions?.reduce((acc, item) => [...acc, ...item.checkedObj], []);
        }
        if (allStites?.length > 0) {
            site = allStites?.reduce((acc, item) => [...acc, ...item.checkedObj], []);
        }
        if (TaskUsersData?.length > 0) {
            teamMember = TaskUsersData?.reduce((acc, item) => [...acc, ...item.checkedObj], []);
            if (isCreatedBy === true) { teamMember.push(isCreatedBy) } else if (isModifiedby === true) { teamMember.push(isModifiedby) } else if (isAssignedto === true) { teamMember.push(isAssignedto) }
        }
        let filteredMasterTaskData: any = []
        if (portFolio.length > 0) {
            filteredMasterTaskData = allMasterTasksData?.filter((data: any) =>
                updatedCheckMatch(data, 'Item_x0020_Type', 'Title', portFolio) &&
                updatedCheckClintCategoryMatch(data, clientCategory) &&
                updatedCheckTeamMembers(data, teamMember, workingActionCheckData) &&
                updatedKeyWordData(data, keyWordSearchTearm) &&
                updatedCheckDateSection(data, startDate, endDate) &&
                updatedCheckSmartActivities(data, smartActivities)
            );
        }
        let filteredTaskData: any = [];
        if (type.length > 0) {
            filteredTaskData = allTastsData?.filter((data: any) =>
                updatedCheckMatch(data, 'siteType', 'Title', site) &&
                updatedCheckTaskType(data, type) &&
                updatedCheckProjectMatch(data, selectedProject) &&
                updatedCheckMatch(data, 'percentCompleteValue', 'TaskStatus', percentComplete) &&
                updatedCheckClintCategoryMatch(data, clientCategory) &&
                updatedCheckCategoryMatch(data, Categories) &&
                updatedCheckTeamMembers(data, teamMember, workingActionCheckData) &&
                updatedKeyWordData(data, keyWordSearchTearm) &&
                updatedCheckDateSection(data, startDate, endDate) &&
                updatedCheckPriority(data, priorityType) &&
                updateCheckParentSmartActivities(data, smartActivities, filteredMasterTaskData, allTastsData)

            );
        }
        let allFinalResult = filteredMasterTaskData?.concat(filteredTaskData);
        if (allFinalResult?.length == 0) {
            item?.setLoaded(true)
        }
        setFinalArray(allFinalResult);
        setFirstTimecallFilterGroup(false);
        setItemsQueryBasedCall(false);
    };
    const updatedCheckClintCategoryMatch = (data: any, clientCategory: any) => {
        try {
            if (clientCategory.length === 0) {
                return true;
            }
            if (data?.ClientCategory?.length > 0 && data?.ClientCategory != undefined && data?.ClientCategory != null) {
                let result = data?.ClientCategory?.some((item: any) => clientCategory.some((filter: any) => filter.Title === item.Title));
                if (result === true) {
                    return true;
                }
            } else {
                let result = clientCategory.some((filter: any) => filter.Title === "Blank" && data?.ClientCategory?.length == 0)
                if (result === true) {
                    return true;
                }
            }
            return false;
        } catch (error) {

        }
    };
    const updatedCheckMatch = (data: any, ItemProperty: any, FilterProperty: any, filterArray: any) => {
        try {
            if (filterArray.length === 0) {
                return true;
            }
            if (Array.isArray(data[ItemProperty])) {
                return data[ItemProperty]?.some((item: any) => filterArray.some((filter: any) => filter.Title === item.Title));
            } else {
                return filterArray.some((filter: any) => filter[FilterProperty] === data[ItemProperty]);
            }
        } catch (error) {

        }
    };
    const updatedCheckCategoryMatch = (data: any, Categories: any) => {
        try {
            if (Categories.length === 0) {
                return true;
            }
            if (data?.TaskCategories?.length > 0 && data?.TaskCategories != undefined && data?.TaskCategories != null) {
                let result = data?.TaskCategories?.some((item: any) => Categories.some((filter: any) => filter.Title === item.Title));
                if (result === true) {
                    return true;
                }
            } else {
                let result = Categories.some((filter: any) => filter.Title === "Other" && data?.Categories === null && data?.TaskCategories?.length == 0)
                if (result === true) {
                    return true;
                }
            }
            return false;
        } catch (error) {

        }
    };
    const updatedCheckProjectMatch = (data: any, selectedProject: any) => {
        try {
            if (selectedProject?.length === 0) {
                return true;
            }
            if (data?.Project) {
                return selectedProject.some((value: any) => data?.Project?.Id === value.Id);
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const updatedCheckSmartActivities = (data: any, smartActivities: any): boolean => {
        try {
            if (smartActivities?.length === 0) {
                return true;
            }

            const hasMatchingActivity = data?.SmartActivities?.some((item: any) => smartActivities?.some((filter: any) => filter?.Id === item?.Id));
            return hasMatchingActivity || false;
        } catch (error) {
            return false;
        }
    };
    const updateCheckParentSmartActivities = ((data: any, smartActivities: any, MasterTasks: any, allTastsData: any) => {
        try {
            if (smartActivities?.length === 0) {
                return true;
            }
            let hasMatchingActivity: any = false;
            let allTaskInfo: any = [...allTastsData]
            let masterTasks: any = [...MasterTasks]
            if (data?.TaskType?.Title == "Activities") {
                let masterInfo = masterTasks.find((mtask: any) => mtask?.Id == data?.Portfolio?.Id)
                if (masterInfo) {
                    hasMatchingActivity = masterInfo?.SmartActivities?.some((item: any) => smartActivities?.some((filter: any) => filter?.Id === item?.Id));
                }
            }
            if (data?.TaskType?.Title == "Workstream") {
                let parentActivity = allTaskInfo?.find((item: any) => item.Id == data?.ParentTask?.Id && item?.siteType === data?.siteType)
                let masterInfo = masterTasks.find((mtask: any) => mtask?.Id == data?.Portfolio?.Id || mtask?.Id == parentActivity?.Portfolio?.Id)
                if (masterInfo) {
                    hasMatchingActivity = masterInfo?.SmartActivities?.some((item: any) =>
                        smartActivities?.some((filter: any) => filter?.Id === item?.Id)
                    );
                }
            }
            if (data?.TaskType?.Title == "Task") {
                let parentWorkStream = allTaskInfo?.find((item: any) => item.Id == data?.ParentTask?.Id && item?.siteType === data?.siteType)
                let parentActivity = allTaskInfo?.find((item: any) => item.Id == parentWorkStream?.ParentTask?.Id && item?.siteType === parentWorkStream?.siteType)
                let masterInfo = masterTasks.find((mtask: any) => { return (mtask?.Id == data?.Portfolio?.Id && data?.Portfolio?.ItemType == mtask?.Item_x0020_Type) || (mtask?.Id == parentWorkStream?.Portfolio?.Id && parentWorkStream?.Portfolio?.ItemType == mtask?.Item_x0020_Type) || (mtask?.Id == parentActivity?.Portfolio?.Id && parentActivity?.Portfolio?.ItemType == mtask?.Item_x0020_Type) })
                if (masterInfo) {
                    hasMatchingActivity = masterInfo?.SmartActivities?.some((item: any) =>
                        smartActivities?.some((filter: any) => filter?.Id === item?.Id)
                    );
                }
            }
            return hasMatchingActivity || false;
        } catch (error) {
            return false;
        }

    })
    const updatedCheckTeamMembers = (data: any, teamMembers: any, workingActionCheckData: any) => {
        try {
            if (isCreatedBy === false && isModifiedby === false && isAssignedto === false && isTeamMember === false && isTeamLead === false && isWorkingDate === false && teamMembers?.length === 0 && workingActionCheckData?.length === 0) {
                return true;
            }
            if (teamMembers?.length === 0) {
                if (isWorkingDate === true) {
                    try {
                        if (data?.WorkingAction) {
                            const workingActionValue = JSON.parse(data?.WorkingAction);
                            const workingDetails = workingActionValue?.find((item: any) => item.Title === 'WorkingDetails');
                            if (workingDetails?.InformationData) {
                                const isWithinDateRange = (date: any) => {
                                    if (startDateWorkingAction && endDateWorkingAction) {
                                        let startDates = startDateWorkingAction?.setHours(0, 0, 0, 0);
                                        let endDates = endDateWorkingAction?.setHours(0, 0, 0, 0);
                                        const workingDate = new Date(Moment(date, 'DD/MM/YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)')).setHours(0, 0, 0, 0)
                                        return workingDate >= startDates && workingDate <= endDates;
                                    } else {
                                        let DefultDate = new Date().setHours(0, 0, 0, 0);
                                        const workingDate = new Date(Moment(date, 'DD/MM/YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)')).setHours(0, 0, 0, 0)
                                        return workingDate >= DefultDate;
                                    }
                                };
                                const result = workingDetails?.InformationData?.some((infoData: any) =>
                                    isWithinDateRange(infoData?.WorkingDate) && infoData?.WorkingMember?.length > 0
                                );
                                if (result) {
                                    return true;
                                }
                            }
                        }
                    } catch (error) {
                      devError(error, "Oops! Something went wrong.");
                    }
                }
                if (workingActionCheckData?.length > 0) {
                    const result = data?.workingActionValue?.some((elem0: any) => workingActionCheckData?.some((filter: any) => filter?.Title?.toLowerCase() === elem0?.Title?.toLowerCase() && elem0?.InformationData?.length > 0));
                    if (result) {
                        return true
                    }
                }
                if (isWorkingDate === true || workingActionCheckData?.length > 0) {
                    return false
                }
            }
            if (isCreatedBy === true && workingActionCheckData?.length==0) {
                let result = teamMembers.some((member: any) => member.Id === data?.Author?.Id);
                if (result === true) {
                    return true;
                }
            }
            if (isModifiedby === true  &&  workingActionCheckData?.length==0) {
                let result = teamMembers.some((member: any) => member.Id === data?.Editor?.Id);
                if (result === true) {
                    return true;
                }
            }
            if (isAssignedto === true &&  workingActionCheckData?.length==0) {
                if (data?.AssignedTo?.length > 0) {
                    let result = data?.AssignedTo?.some((elem0: any) => teamMembers.some((filter: any) => filter?.Id === elem0?.Id));
                    if (result === true) {
                        return true;
                    }
                }
            }
            if (isTeamLead === true &&  workingActionCheckData?.length==0) {
                if (data?.ResponsibleTeam.length > 0) {
                    let result = data?.ResponsibleTeam?.some((elem: any) => teamMembers.some((filter: any) => filter?.Id === elem?.Id));

                    if (result === true) {
                        return true;
                    }
                }
            }
            if (isTeamMember === true && workingActionCheckData?.length==0) {
                if (data?.TeamMembers?.length > 0) {
                    let result = data?.TeamMembers?.some((elem1: any) => teamMembers.some((filter: any) => filter?.Id === elem1?.Id));
                    if (result === true) {
                        return true;
                    }
                }
            }
            if (isWorkingDate === true) {
                try {
                    if (data?.WorkingAction) {
                        const workingActionValue = JSON.parse(data?.WorkingAction);
                        const workingDetails = workingActionValue?.find((item: any) => item.Title === 'WorkingDetails');
                        if (workingDetails) {
                            const isWithinDateRange = (date: any) => {
                                let startDates = startDateWorkingAction?.setHours(0, 0, 0, 0);
                                let endDates = endDateWorkingAction?.setHours(0, 0, 0, 0);
                                const workingDate = new Date(Moment(date, 'DD/MM/YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)')).setHours(0, 0, 0, 0)
                                return workingDate >= startDates && workingDate <= endDates;
                            };
                            const result = workingDetails?.InformationData?.some((infoData: any) =>
                                infoData?.WorkingMember?.some((workingMember: any) =>
                                    teamMembers?.some((teamMember: any) =>
                                        isWithinDateRange(infoData?.WorkingDate) && teamMember?.Id === workingMember?.Id
                                    )
                                )
                            );
                            if (result) {
                                return true;
                            }
                        }
                    }
                } catch (error) {
                  devError(error, "Oops! Something went wrong.");
                }
            }
            if (workingActionCheckData?.length > 0) {
                const teamMemberIds = new Set(teamMembers?.map((user: any) => user?.Id));
                let isUserCreated=teamMembers?.some((member: any) => member?.Id === data?.Author?.Id);
                 let isUserModified= teamMembers?.some((member: any) => member.Id === data?.Editor?.Id);
                 let isUserAssigned=data?.AssignedTo?.some((elem0: any) => teamMembers?.some((filter: any) => filter?.Id === elem0?.Id));
                 let isTeamLeadAvailable =data?.ResponsibleTeam?.some((elem: any) => teamMembers?.some((filter: any) => filter?.Id === elem?.Id));
                 let isTeammeber=data?.TeamMembers?.some((elem1: any) => teamMembers?.some((filter: any) => filter?.Id === elem1?.Id));
                const result = data?.workingActionValue?.some((elem0: any) => workingActionCheckData?.some((filter: any) => filter?.Title?.toLowerCase() === elem0?.Title?.toLowerCase() && elem0?.InformationData?.length > 0 && elem0?.InformationData?.some((infoData: any) => infoData?.TaggedUsers?.some((tagUser: any) => teamMemberIds.has(tagUser?.AssingedToUserId)))));
                
                if (result) {
                    if(isCreatedBy === true || isModifiedby === true || isAssignedto === true || isTeamMember === true || isTeamLead === true){
                        if(isCreatedBy==true && isUserCreated){
                            return true
                        }
                        if(isUserModified==true &&isModifiedby==true){
                            return true
                        }
                        if(isUserAssigned==true&&isAssignedto){
                            return true
                        }
                        if(isTeamLeadAvailable==true&& isTeamLead){
                            return true
                        }
                        if(isTeammeber==true&&isTeamMember){
                            return true
                        }
                    }else{
                    return true;
                }

                    
                }
            }
            if (isCreatedBy === false && isModifiedby === false && isAssignedto === false && isTeamMember === false && isTeamLead === false && isWorkingDate === false && workingActionCheckData?.length === 0 && teamMembers?.length > 0) {
                let result = data?.TeamLeaderUser?.some((elem3: any) => teamMembers?.some((filter: any) => filter?.Id === elem3?.Id));
                if (result === true) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            return false;
        }
    };
    const updatedCheckTaskType = (data: any, type: any) => {
        try {
            if (type?.length === 0) {
                return true;
            }
            if (data?.TaskType) {
                return type.some((value: any) => data?.TaskType?.Title === value.Title);
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const updatedCheckPriority = (data: any, priorityType: any) => {
        try {
            if (priorityType?.length === 0) {
                return true;
            }
            if (data.Priority !== undefined && data.Priority !== '' && data.Priority !== null) {
                return priorityType.some((value: any) => value.Title === data.Priority || value.Title === data.PriorityRank);
            } else {
                let result = priorityType?.some((filter: any) => filter?.Title === "Other" && data?.PriorityRank === null)
                if (result === true) {
                    return true;
                }
            }
                return false;
        } catch (error) {
            return false;
        }
    };

    const updatedKeyWordData = (data: any, keyWordSearchTearm: any) => {
        try {
            if (keyWordSearchTearm?.length === 0) {
                return true;
            }
            const cellValue: any = String(data.Title).toLowerCase();
            keyWordSearchTearm = keyWordSearchTearm.replace(/\s+/g, " ").trim().toLowerCase();
            if (selectedKeyWordFilter === "Allwords") {
                let found = true;
                let a = keyWordSearchTearm?.split(" ")
                for (let item of a) {
                    if (!cellValue.split(" ").some((elem: any) => elem === item)) {
                        found = false;
                    }
                }
                return found
            } else if (selectedKeyWordFilter === "Anywords") {
                for (let item of keyWordSearchTearm.split(" ")) {
                    if (cellValue.includes(item)) return true;
                }
                return false;
            } else if (selectedKeyWordFilter === "ExactPhrase") {
                return cellValue.includes(keyWordSearchTearm);
            }
        } catch (error) {

        }
    };
    const updatedCheckDateSection = (data: any, startDate: any, endDate: any) => {
        try {
            if (startDate === null && endDate === null) {
                return true;
            }
            startDate = startDate.setHours(0, 0, 0, 0);
            endDate = endDate.setHours(0, 0, 0, 0);
            if (isCreatedDateSelected === true) {
                let result = (data?.serverCreatedDate && data.serverCreatedDate >= startDate && data.serverCreatedDate <= endDate);
                if (result === true) {
                    return true;
                }
            }
            if (isModifiedDateSelected === true) {
                let result = (data?.serverModifiedDate && data.serverModifiedDate >= startDate && data.serverModifiedDate <= endDate);
                if (result === true) {
                    return true;
                }
            }
            if (isDueDateSelected === true) {
                if (data?.serverDueDate != undefined) {
                    let result = (data?.serverDueDate && data.serverDueDate >= startDate && data.serverDueDate <= endDate);
                    if (result === true) {
                        return true;
                    }
                }
            }
            if (isCreatedDateSelected === false && isModifiedDateSelected === false && isDueDateSelected === false) {
                return true;
                // if (data?.serverDueDate != undefined || data.serverModifiedDate != undefined || data.serverCreatedDate != undefined) {
                //     let result = ((data?.serverDueDate && data.serverDueDate >= startDate && data.serverDueDate <= endDate) || (data?.serverModifiedDate && data.serverModifiedDate >= startDate && data.serverModifiedDate <= endDate)
                //         || (data?.serverCreatedDate && data.serverCreatedDate >= startDate && data.serverCreatedDate <= endDate));
                //     if (result === true) {
                //         return true;
                //     }
                // }
            }
            return false;
        } catch (error) {
            return false;
        }
    };

    const ClearFilter = function () {
        if (item?.IsSmartfavoriteId === "") {
            item?.setLoaded(false);
            if (TaskUsersData) {
                let userResetData = TaskUsersData.map((elem) => {
                    elem.checked = [];
                    elem.checkedObj = [];
                    return elem;
                });
                setTaskUsersData(userResetData);
            }
            getTaskUsers();
            setSelectedProject([])
            setKeyWordSearchTearm("");
            setKeyWordSelected("Allwords");
            setIsCreatedBy(false)
            setIsModifiedby(false)
            setIsAssignedto(false)
            setSelectedFilter("")
            setSelectedFilterWorkingAction("")
            setStartDate(null)
            setEndDate(null)
            setStartDateWorkingAction(null);
            setEndDateWorkingAction(null);
            setIsCreatedDateSelected(false)
            setIsModifiedDateSelected(false)
            setIsDueDateSelected(false)
            setIsWorkingDate(false)
            GetfilterGroups();
            setUpdatedSmartFilter(false);
            setFinalArray([]);
            setFlatView(false);
            setIsTeamLead(false);
            setIsTeamMember(false);
            setIsTodaysTask(false);
            setIsPhone(false)
            setIsBottleneck(false)
            setIsAttention(false)
            setcollapseAll(true);
            setIconIndex(0)
            setIsSitesExpendShow(false);
            setIsClientCategory(false)
            setIsProjectExpendShow(false);
            setIsKeywordsExpendShow(false)
            setIscategoriesAndStatusExpendShow(false);
            setIsTeamMembersExpendShow(false);
            setIsActionsExpendShow(false)
            setIsTeamMemberActivities(false)
            setIsDateExpendShow(false);
            setIsDateExpendShowWorkingAction(false)
            setIsSmartfilter(false);
            item?.setSmartFabBasedColumnsSetting([]);
            // setPreSet(false);
        } else {
            item?.setLoaded(false);
            setFlatView(true);
            setcollapseAll(true);
            setIconIndex(0)
            setIsSitesExpendShow(false);
            setIsClientCategory(false)
            setIsProjectExpendShow(false);
            setIsKeywordsExpendShow(false)
            setIscategoriesAndStatusExpendShow(false);
            setIsTeamMembersExpendShow(false);
            setIsActionsExpendShow(false);
            setIsTeamMemberActivities(false)
            setIsDateExpendShow(false);
            setIsDateExpendShowWorkingAction(false)
            setIsSmartfilter(false);
            // setItemsQueryBasedCall(false);
            loadAdminConfigurationsId(item?.IsSmartfavoriteId);
            item?.setSmartFabBasedColumnsSetting([])
            rerender();
        }
    };
    const UpdateFilterData = (event: any) => {
        if (item?.webPartTemplateSmartFilter != true) {
            if (event === "udateClickTrue") {
                if (AllSiteTasksDataLoadAll?.length > 0) {
                    allTastsData = [];
                    allTastsData = allTastsData.concat(AllSiteTasksDataLoadAll);
                }
                item?.setLoaded(false);
                setUpdatedSmartFilter(true);
                FilterDataOnCheck();
            } else if (event === "udateClickFalse" && updatedSmartFilter === true) {
                item?.setLoaded(false);
                setUpdatedSmartFilter(true);
                FilterDataOnCheck();
            } else if (event === "udateClickFalse" && updatedSmartFilter === false) {
                item?.setLoaded(false);
                FilterDataOnCheck();
            }
        } else if (item?.webPartTemplateSmartFilter === true && event === "udateClickTrue") {
            let Favorite = {
                Title: "",
                SmartFavoriteType: "SmartFilterBased",
                CurrentUserID: item?.ContextValue?.Context?.pageContext?.legacyPageContext?.userId,
                isShowEveryone: true,
                filterGroupsData: filterGroupsData,
                allFilterClintCatogryData: allFilterClintCatogryData,
                allStites: allStites,
                isWorkingActions: isWorkingActions,
                selectedProject: selectedProject,
                startDate: startDate,
                endDate: endDate,
                startDateWorkingAction: startDateWorkingAction,
                endDateWorkingAction: endDateWorkingAction,
                isCreatedBy: isCreatedBy,
                isModifiedby: isModifiedby,
                isAssignedto: isAssignedto,
                isTeamLead: isTeamLead,
                isTeamMember: isTeamMember,
                isTodaysTask: isTodaysTask,
                selectedFilter: selectedFilter,
                selectedFilterWorkingAction: selectedFilterWorkingAction,
                isCreatedDateSelected: isCreatedDateSelected,
                isModifiedDateSelected: isModifiedDateSelected,
                isDueDateSelected: isDueDateSelected,
                TaskUsersData: TaskUsersData,
                smartFabBasedColumnsSetting: MyContextdata?.allContextValueData?.smartFabBasedColumnsSetting ? MyContextdata?.allContextValueData?.smartFabBasedColumnsSetting : {},
                isPhone: isPhone,
                flatView: flatView,
                isBottleneck: isBottleneck,
                isAttention: isAttention,
                isWorkingDate: isWorkingDate,
            }
            smartFiltercallBackData(Favorite);
        }
    };

    const showSmartFilter = (value: any) => {
        if (value == "isSitesExpendShow") {
            if (isSitesExpendShow == true) {
                setIsSitesExpendShow(false)

            } else {
                setIsSitesExpendShow(true)

            }
        }
        if (value === "isClientCategory") {
            if (isClientCategory == true) {
                setIsClientCategory(false)

            } else {
                setIsClientCategory(true)

            }
        }
        if (value == "isKeywordsExpendShow") {
            if (isKeywordsExpendShow == true) {
                setIsKeywordsExpendShow(false)

            } else {
                setIsKeywordsExpendShow(true)

            }
        }

        if (value == "isProjectExpendShow") {
            if (isProjectExpendShow == true) {
                setIsProjectExpendShow(false)

            } else {
                setIsProjectExpendShow(true)

            }
        }
        if (value == "iscategoriesAndStatusExpendShow") {
            if (iscategoriesAndStatusExpendShow == true) {
                setIscategoriesAndStatusExpendShow(false)

            } else {
                setIscategoriesAndStatusExpendShow(true)

            }
        }
        if (value == "isTeamMembersExpendShow") {
            if (isTeamMembersExpendShow == true) {
                setIsTeamMembersExpendShow(false)

            } else {
                setIsTeamMembersExpendShow(true)

            }
        }
        if (value == "isActionsExpendShow") {
            if (isActionsExpendShow == true) {
                setIsActionsExpendShow(false)

            } else {
                setIsActionsExpendShow(true)

            }
        }
        if (value == "isTeamMemberActivities") {
            if (isTeamMemberActivities == true) {
                setIsTeamMemberActivities(false)

            } else {
                setIsTeamMemberActivities(true)

            }
        }
        if (value == "isDateExpendShow") {
            if (isDateExpendShow == true) {
                setIsDateExpendShow(false)
            } else {
                setIsDateExpendShow(true)
            }
        }
        if (value == "isDateExpendShowWorkingAction") {
            if (isDateExpendShowWorkingAction == true) {
                setIsDateExpendShowWorkingAction(false)
            } else {
                setIsDateExpendShowWorkingAction(true)
            }
        }
        if (value == "isEveryOneShow") {
            if (isEveryOneShow == true) {
                setIsEveryOneShow(false)
            } else {
                setIsEveryOneShow(true)
            }
        }
        if (value == "isOnlyMeShow") {
            if (isOnlyMeShow == true) {
                setIsOnlyMeShow(false)
            } else {
                setIsOnlyMeShow(true)
            }
        }
    }
    const toggleAllExpendCloseUpDown = (iconIndex: any) => {
        if (iconIndex == 0) {
            setcollapseAll(false);
            setIsSitesExpendShow(false);
            setIsClientCategory(false)
            setIsProjectExpendShow(false)
            setIsKeywordsExpendShow(false)
            setIscategoriesAndStatusExpendShow(false);
            setIsTeamMembersExpendShow(false);
            setIsActionsExpendShow(false)
            setIsTeamMemberActivities(false)
            setIsDateExpendShow(false);
            setIsDateExpendShowWorkingAction(false)
            setIsSmartfilter(false);
        } else if (iconIndex == 1) {
            setcollapseAll(false);
            setIsSitesExpendShow(true);
            setIsClientCategory(true)
            setIsProjectExpendShow(true)
            setIsKeywordsExpendShow(true)
            setIscategoriesAndStatusExpendShow(true);
            setIsTeamMembersExpendShow(true);
            setIsActionsExpendShow(true)
            setIsTeamMemberActivities(true)
            setIsDateExpendShow(true);
            setIsDateExpendShowWorkingAction(true)
            setIsSmartfilter(true);
        } else if (iconIndex == 2) {
            setcollapseAll(false);
            setIsSitesExpendShow(false);
            setIsClientCategory(false)
            setIsProjectExpendShow(false)
            setIsKeywordsExpendShow(false)
            setIscategoriesAndStatusExpendShow(false);
            setIsTeamMembersExpendShow(false);
            setIsActionsExpendShow(false);
            setIsTeamMemberActivities(false)
            setIsDateExpendShow(false);
            setIsDateExpendShowWorkingAction(false)
            setIsSmartfilter(false);

        } else {
            setcollapseAll(true);
            setIsSitesExpendShow(false);
            setIsClientCategory(false)
            setIsProjectExpendShow(false);
            setIsKeywordsExpendShow(false)
            setIscategoriesAndStatusExpendShow(false);
            setIsTeamMembersExpendShow(false);
            setIsActionsExpendShow(false)
            setIsTeamMemberActivities(false)
            setIsDateExpendShow(false);
            setIsDateExpendShowWorkingAction(false)
            setIsSmartfilter(false);
        }
    };

    const toggleIcon = () => {
        setIconIndex((prevIndex) => (prevIndex + 1) % 4);
    };
    React.useEffect(() => {
        if (item?.webPartTemplateSmartFilter === true) {
            setIconIndex((prevIndex) => (1 + 1) % 4);
            toggleAllExpendCloseUpDown(1);
        }
    }, [item?.webPartTemplateSmartFilter])

    const icons = [
        <AiOutlineUp className='upSizeIcon' style={{ color: `${portfolioColor}`, width: '16px', height: "16px" }} />,
        <SlArrowRight style={{ color: `${portfolioColor}`, width: '12px' }} />,
        <SlArrowDown style={{ color: `${portfolioColor}`, width: '12px' }} />,
        <SlArrowRight style={{ color: `${portfolioColor}`, width: '12px' }} />,
    ];

    //*************************************************************smartTimeTotal*********************************************************************/
    const smartTimeTotal = async () => {
        item?.setLoaded(false);
        await globalCommon.smartTimeFind({ item, smartmetaDataDetails, timeSheetConfig });
        UpdateFilterData("udateClickFalse");
    }
    //*************************************************************smartTimeTotal End*********************************************************************/
    /// **************** CallBack Part *********************///
    React.useEffect(() => {
        if (updatedSmartFilter === true && item?.webPartTemplateSmartFilter != true) {
            smartFiltercallBackData(finalArray, updatedSmartFilter, smartTimeTotal, flatView)
        } else if (updatedSmartFilter === false && item?.webPartTemplateSmartFilter != true) {
            smartFiltercallBackData(finalArray, updatedSmartFilter, smartTimeTotal, flatView)
        }
    }, [finalArray])
    //*************************************************************Date Sections*********************************************************************/
    React.useEffect(() => {
        const currentDate: any = new Date();
        switch (selectedFilter) {
            case "today":
                setStartDate(currentDate);
                setEndDate(currentDate);
                break;
            case "yesterday":
                const yesterday = new Date(currentDate);
                yesterday.setDate(currentDate.getDate() - 1);
                setStartDate(yesterday);
                setEndDate(yesterday);
                break;
            case "thisweek":
                const dayOfWeek = currentDate.getDay(); // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)
                const startDate = new Date(currentDate); // Create a copy of the current date
                // Calculate the number of days to subtract to reach the previous Monday
                const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                startDate.setDate(currentDate.getDate() - daysToSubtract);
                setStartDate(startDate);
                setEndDate(currentDate);
                break;
            case "last7days":
                const last7DaysStartDate = new Date(currentDate);
                last7DaysStartDate.setDate(currentDate.getDate() - 6);
                setStartDate(last7DaysStartDate);
                setEndDate(currentDate);
                break;
            case "thismonth":
                const monthStartDate = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    1
                );
                setStartDate(monthStartDate);
                setEndDate(currentDate);
                break;
            case "last30days":
                const last30DaysEndDate: any = new Date(currentDate);
                last30DaysEndDate.setDate(currentDate.getDate() - 1);
                const last30DaysStartDate = new Date(last30DaysEndDate);
                last30DaysStartDate.setDate(last30DaysEndDate.getDate() - 30);
                setStartDate(last30DaysStartDate);
                setEndDate(last30DaysEndDate);
                break;
            case "last3months":
                const lastMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                const last3MonthsStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
                setStartDate(last3MonthsStartDate);
                setEndDate(lastMonthEndDate);
                break;
            case "thisyear":
                const yearStartDate = new Date(currentDate.getFullYear(), 0, 1);
                setStartDate(yearStartDate);
                setEndDate(currentDate);
                break;
            case "lastyear":
                const lastYearStartDate = new Date(currentDate.getFullYear() - 1, 0, 1);
                const lastYearEndDate = new Date(currentDate.getFullYear() - 1, 11, 31);
                setStartDate(lastYearStartDate);
                setEndDate(lastYearEndDate);
                break;
            case "Pre-set":
                let storedDataStartDate: any
                let storedDataEndDate: any
                try {
                    storedDataStartDate = JSON.parse(localStorage.getItem('startDate'));
                    storedDataEndDate = JSON.parse(localStorage.getItem('endDate'))
                } catch (error) {

                }
                if (storedDataStartDate && storedDataStartDate != null && storedDataStartDate != "Invalid Date" && storedDataEndDate && storedDataEndDate != null && storedDataEndDate != "Invalid Date") {
                    setStartDate(new Date(storedDataStartDate));
                    setEndDate(new Date(storedDataEndDate));
                }
                break;
            case "custom":
                if (changeInDatePicker != true) {
                    setStartDate(null);
                    setEndDate(null);
                }
                break;
            default:
                setStartDate(null);
                setEndDate(null);
                break;
        }
    }, [selectedFilter]);
    const selectingStartDate = (date: any) => {
        setStartDate(date)
        const currentDate: any = new Date();
        if (currentDate.getDate() != date.getDate() && endDate.getDate() != date.getDate()) {
            setChangeDatePicker(true)
            setSelectedFilter("custom")
        }
        else if (currentDate.getDate() == date.getDate() && endDate.getDate() == date.getDate()) {
            setSelectedFilter("today")
        }
        else if (currentDate.getDate() - 1 == date.getDate() && endDate.getDate() == date.getDate()) {
            setSelectedFilter("yesterday")
        }
    }
    const selectingEndDate = (date: any) => {
        setEndDate(date);
        const currentDate: any = new Date();
        if ((currentDate.getDate() != date.getDate() || currentDate.getDate() == date.getDate()) && startDate.getDate() != date.getDate()) {
            setChangeDatePicker(true)
            setSelectedFilter("custom")
        }
        else if (currentDate.getDate() == date.getDate() && startDate.getDate() == date.getDate()) {
            setSelectedFilter("today")
        }
        else if (currentDate.getDate() - 1 == date.getDate() && startDate.getDate() == date.getDate()) {
            setSelectedFilter("yesterday")
        }

    }
    const handleDateFilterChange = (event: any) => {
        setSelectedFilter(event.target.value);
        setChangeDatePicker(false)
        if (
            !isCreatedDateSelected &&
            !isModifiedDateSelected &&
            !isDueDateSelected
        ) {
            switch (event.target.value) {
                case "today": case "yesterday": case "thisweek": case "last7days":
                case "thismonth": case "last30days": case "last3months": case "thisyear": case "lastyear": case "Pre-set":
                    setIsCreatedDateSelected(true);
                    setIsModifiedDateSelected(true);
                    setIsDueDateSelected(true);
                    break;
                default:
                    setIsCreatedDateSelected(false);
                    setIsModifiedDateSelected(false);
                    setIsDueDateSelected(false);
                    break;
            }
        }
    };
    const clearDateFilters = () => {
        setSelectedFilter("");
        setStartDate(null);
        setEndDate(null);
        setIsCreatedDateSelected(false);
        setIsModifiedDateSelected(false);
        setIsDueDateSelected(false);
    };


    React.useEffect(() => {
        const currentDate: any = new Date();
        switch (selectedFilterWorkingAction) {
            case "today":
                setStartDateWorkingAction(currentDate);
                setEndDateWorkingAction(currentDate);
                break;
            case "tomorrow":
                const tomorrow = new Date(currentDate);
                tomorrow.setDate(currentDate.getDate() + 1);
                setStartDateWorkingAction(tomorrow);
                setEndDateWorkingAction(tomorrow);
                break;
            case "thisweek":
                const dayOfWeek: any = currentDate.getDay();
                const startOfWeek: any = new Date(currentDate);
                const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                startOfWeek.setDate(currentDate.getDate() - daysToSubtract);
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                setStartDateWorkingAction(startOfWeek);
                setEndDateWorkingAction(endOfWeek);
                break;
            case "nextweek":
                const dayOfWeeks: any = currentDate.getDay();
                const startOfNextWeek: any = new Date(currentDate);
                startOfNextWeek.setDate(currentDate.getDate() + (7 - dayOfWeeks + 1));
                const endOfNextWeek = new Date(startOfNextWeek);
                endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
                setStartDateWorkingAction(startOfNextWeek);
                setEndDateWorkingAction(endOfNextWeek);
                break;
            case "thismonth":
                const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                setStartDateWorkingAction(monthStartDate);
                setEndDateWorkingAction(monthEndDate);
                break;
            case "nextmonth":
                const nextMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
                const nextMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
                setStartDateWorkingAction(nextMonthStartDate);
                setEndDateWorkingAction(nextMonthEndDate);
                break;
            case "custom":
                if(IsFirstimeCustomeDate!=true){
                setStartDateWorkingAction(null);
                setEndDateWorkingAction(null);
                }
                
                break;
            default:
                setStartDateWorkingAction(null);
                setEndDateWorkingAction(null);
                break;
        }
    }, [selectedFilterWorkingAction]);
    const handleDateFilterChangeWorkingAction = (event: any) => {
        setIsFirstimeCustomeDate(false)
        setSelectedFilterWorkingAction(event.target.value);
        if (!isWorkingDate) {
            switch (event.target.value) {
                case "today": case "tomorrow": case "thisweek": case "nextweek":
                case "thismonth": case "nextmonth": case "custom":
                    setIsWorkingDate(true);
                    break;
                default:
                    setIsWorkingDate(false);
                    break;
            }
        }
    };
    React.useEffect(() => {
        if (isWorkingDate === false) {
            setSelectedFilterWorkingAction("");
            setStartDateWorkingAction(null);
            setEndDateWorkingAction(null);
        }
    }, [isWorkingDate])
    const clearDateFiltersWorkingAction = () => {
        setSelectedFilterWorkingAction("");
        setStartDateWorkingAction(null);
        setEndDateWorkingAction(null);
        setIsWorkingDate(false);
    };

    const ExampleCustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
        <div style={{ position: "relative" }} onClick={onClick} ref={ref}>
            <input
                type="text"
                id="datepicker"
                className="form-control date-picker ps-2"
                placeholder="DD MMM YYYY"
                defaultValue={value}
            />
            <span
                style={{
                    position: "absolute",
                    top: "58%",
                    right: "8px",
                    transform: "translateY(-50%)",
                    cursor: "pointer"
                }}
            >
                <span className="svg__iconbox svg__icon--calendar dark"></span>
            </span>
        </div>
    ));
    //*************************************************************Date Sections End*********************************************************************/
    ///////project section ////////////
    const onRenderCustomProjectManagementHeader = () => {
        return (
            <div className="d-flex full-width pb-1">
                <div className="subheading">
                    <span>
                        Select Project
                    </span>
                </div>
                <Tooltip ComponentId="1608" />
            </div>
        )
    }

    // ************** this is for Project Management Section Functions ************

    let selectedProjectData: any = []
    const SelectProjectFunction = (selectedData: any) => {
        let selectedTempArray: any = [];
        AllProjectBackupArray?.map((ProjectData: any) => {
            selectedData.map((item: any) => {
                if (ProjectData.Id == item.Id) {
                    ProjectData.Checked = true;
                    selectedTempArray.push(ProjectData);
                } else {
                    ProjectData.Checked = false;
                }
            })
        })
        setSelectedProject(selectedTempArray);
    }

    const autoSuggestionsForProject = (e: any) => {
        let allSuggestion: any = [];
        let searchedKey: any = e.target.value;
        setProjectSearchKey(e.target.value);
        if (searchedKey?.length > 0) {
            item?.ProjectData?.map((itemData: any) => {
                if (itemData.Title.toLowerCase().includes(searchedKey.toLowerCase())) {
                    allSuggestion.push(itemData);
                }
            })
            setSearchedProjectData(allSuggestion);
        } else {
            setSearchedProjectData([]);
        }

    }

    const SelectProjectFromAutoSuggestion = (data: any) => {
        setProjectSearchKey('');
        setSearchedProjectData([]);
        selectedProject.push(data)
        setSelectedProject([...selectedProject]);
    }
    const RemoveSelectedProject = (Index: any) => {
        let tempArray: any = [];
        selectedProject?.map((item: any, index: any) => {
            if (Index != index) {
                tempArray.push(item);
            }
        })
        setSelectedProject(tempArray)
    }

    const callBackData = React.useCallback((checkData: any, Type: any, functionType: any) => {
        let MultiSelectedData: any = [];
        if (checkData?.length > 0 && functionType == "Save") {
            checkData.map((item: any) => MultiSelectedData?.push(item))
            SelectProjectFunction(MultiSelectedData);
            setProjectManagementPopup(false);
        } else {
            setProjectManagementPopup(false);
        }
    }, []);

    const PreSetPikerCallBack = React.useCallback((preSetStartDate: any, preSetEndDate) => {
        if (preSetStartDate != undefined) {
            setStartDate(preSetStartDate);
        }
        if (preSetEndDate != undefined) {
            setEndDate(preSetEndDate);
        }
        if (preSetStartDate != undefined || preSetEndDate != undefined) {
            setSelectedFilter("Pre-set");
        }

        setPreSetPanelIsOpen(false)
    }, []);
    const handleSwitchToggle = () => {
        setFlatView(!flatView);
    };
    const preSetIconClick = () => {
        // setPreSet(true);
        setPreSetPanelIsOpen(true);
    }

    ///////////end/////////////////////
    //*******************************************************************Key Word Section ****************************/
    const handleInputChange = (e: any) => {
        const { value } = e.target;
        setKeyWordSearchTearm(value);
    };
    //*******************************************************************Key Word Section End****************************/
    const checkIcons =
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="0.5" y="0.5" width="15" height="15" fill="${portfolioColor}" stroke="${portfolioColor}"></rect>
      <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M6.31338 9.13481L5.67412 8.53123L4.60713 7.5238C4.58515 7.50305 4.57416 7.49267 4.56468 7.48416C4.1695 7.12964 3.60074 7.17792 3.27097 7.59398C3.26305 7.60397 3.25397 7.61605 3.23581 7.64021L3.23579 7.64023C3.21764 7.66437 3.20856 7.67645 3.20111 7.68689C2.89114 8.12164 2.94516 8.75793 3.32397 9.1342C3.33307 9.14324 3.34406 9.15361 3.36604 9.17437L4.43303 10.1818L5.50002 11.1892C5.522 11.21 5.53299 11.2204 5.54248 11.2289C5.72498 11.3926 5.94451 11.4704 6.16042 11.4658C6.47041 11.5827 6.82848 11.514 7.09362 11.2512L9.79825 8.57051L12.5029 5.88984C12.8951 5.50105 12.9355 4.83465 12.593 4.40137L12.5727 4.37574L12.5525 4.3501C12.21 3.91683 11.6144 3.88076 11.2221 4.26954L8.51748 6.95022L6.31338 9.13481Z" fill="white" stroke="white" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>`;

    const checkBoxIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="0.5" y="0.5" width="15" height="15" fill="white" stroke="#CCCCCC"/>
    </svg>
  `;
    const halfCheckBoxIcons = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' version='1.1'>
        <path d='M16 16l0 992 992 0L1008 16 16 16zM946 946 78 946 78 78l868 0L946 946zM264 264l496 0 0 496-496 0L264 264z' fill='${portfolioColor}'/>
    </svg>`;
    const svgData = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' version='1.1'>
        <path d='M16 16l0 992 992 0L1008 16 16 16zM946 946 78 946 78 78l868 0L946 946zM264 264l496 0 0 496-496 0L264 264z' fill='${portfolioColor}'/>
    </svg>`;
    const checkBoxColor = () => {
        setTimeout(() => {
            const inputElements = document.getElementsByClassName('custom-checkbox-tree');
            if (inputElements) {
                for (let j = 0; j < inputElements?.length; j++) {
                    const checkboxContainer = inputElements[j];
                    const childElements = checkboxContainer.getElementsByClassName('rct-text');
                    const childElements2 = checkboxContainer.getElementsByClassName('rct-title');
                    const buttonsMAin = checkboxContainer.getElementsByClassName('rct-collapse rct-collapse-btn');

                    if (buttonsMAin?.length >= 1) {
                        for (let i = 0; i < childElements.length; i++) {
                            const checkbox = childElements[i];
                            const label = childElements2[i];
                            const button = checkbox.querySelector('.rct-collapse.rct-collapse-btn');
                            if (!button) {
                                checkbox.classList.add('smartFilterAddedMargingClass');

                            }
                        }

                    }

                }
            }
        }, 200);
    }
    React.useEffect(() => {
        checkBoxColor();
    }, [iscategoriesAndStatusExpendShow, isClientCategory]);
    const selectAllFromAbove = (selectedItem: any, event: any) => {
        let allSmartOptions = JSON.parse(JSON.stringify(filterGroupsData));
        allSmartOptions?.map((MainGroup: any, index: any) => {
            if (MainGroup?.Title == "Type") {
                MainGroup?.values?.map((Group: any) => {
                    if (Group.Id == selectedItem?.Id && event == false) {
                        Group.selectAllChecked = false;
                        MainGroup.checked = MainGroup.checked.filter((groupCheckId: any) => groupCheckId != Group.Id);
                        MainGroup.checked = MainGroup.checked.filter((groupCheckId: any) => {
                            return !Group.children?.some((elem: any) => elem.Id == groupCheckId);
                        });
                        MainGroup.checkedObj = MainGroup.checkedObj.filter((groupCheck: any) => groupCheck.Id != Group.Id);
                        MainGroup.checkedObj = MainGroup.checkedObj.filter((groupCheck: any) => {
                            return !Group.children?.some((elem: any) => elem.Id == groupCheck.Id);
                        });
                    } else if (Group.Id == selectedItem?.Id && event == true) {
                        Group.selectAllChecked = true;
                        MainGroup.checked.push(String(Group.Id));
                        MainGroup.checkedObj.push({
                            Id: String(Group.Id),
                            Title: Group.Title,
                            TaxType: Group.TaxType
                        });
                        if (Group.children && Array.isArray(Group.children)) {
                            Group.children.forEach((child: any) => {
                                MainGroup.checked.push(String(child.Id));
                                MainGroup.checkedObj.push({
                                    Id: String(child.Id),
                                    Title: child.Title,
                                    TaxType: child.TaxType
                                });
                            });
                        }
                    }

                })
            }
        })
        setFilterGroups((prev) => allSmartOptions)
        rerender()
    }
    const selectChild = (selectedItem: any) => {
        let allSmartOptions = JSON.parse(JSON.stringify(filterGroupsData));
        allSmartOptions?.map((MainGroup: any, index: any) => {
            if (MainGroup?.Title == "Type") {
                if (MainGroup?.checked?.some((groupCheckId: any) => groupCheckId == selectedItem?.Id)) {
                    MainGroup.checked = MainGroup?.checked?.filter((groupCheckId: any) => groupCheckId != selectedItem?.Id)
                } else {
                    if (MainGroup.checked != undefined) {
                        MainGroup.checked.push(selectedItem?.Id)
                    }
                }
                if (MainGroup?.checkedObj?.some((groupCheck: any) => groupCheck?.Id == selectedItem?.Id)) {
                    MainGroup.checkedObj = MainGroup?.checkedObj?.filter((groupCheck: any) => groupCheck?.Id != selectedItem?.Id)
                } else {
                    if (MainGroup.checkedObj != undefined) {
                        const selectedProperties = {
                            Id: selectedItem.Id,
                            Title: selectedItem.Title,
                            TaxType: selectedItem.TaxType,
                        };
                        MainGroup.checkedObj.push(selectedProperties);
                    }
                }
            }
        })

        setFilterGroups((prev) => allSmartOptions)
        rerender()
    }
    const selectedFilterCallBack = React.useCallback((item: any, updatedData: any) => {
        if (item != undefined && updatedData) {
            setSelectedFilterPanelIsOpen(false)
            setSelectedFilterPanelIsOpenUpdate(false);
            setUpdatedEditData({})
            setIsSmartFevShowHide(true);
            loadAdminConfigurations();
        } else {
            setSelectedFilterPanelIsOpen(false)
            setSelectedFilterPanelIsOpenUpdate(false);
        }
    }, []);

    const OpenSmartfavorites = (type: any) => {
        if (type === "goToSmartFilter") {
            setIsSmartFevShowHide(false)
        } else if (type === "goToSmartFavorites") {
            loadAdminConfigurations();
            setIsSmartFevShowHide(true);
        }
    }
    const loadAdminConfigurations = async () => {
        let copyCreateMeSmartFavorites: any = [];
        let copyEveryoneSmartFavorites: any = [];
        let filter = "Key eq 'Smartfavorites'";
        web.lists.getById(item?.ContextValue?.AdminconfigrationID)
            .items.select('Id', 'Title', 'Value', 'Key', 'Description', 'DisplayTitle', 'Configurations').filter(filter).top(4999).get()
            .then((Results: any) => {
                Results?.map((smart: any) => {
                    if (smart.Configurations !== undefined) {
                        const Arrays = JSON.parse(smart.Configurations);
                        Arrays.map((config: any) => {
                            if (config.isShowEveryone === true) {
                                config.Id = smart.Id;
                                copyEveryoneSmartFavorites.push(config);
                            }
                            if (config.CurrentUserID !== undefined && config.CurrentUserID === item?.ContextValue?.Context?.pageContext?.legacyPageContext?.userId && config.isShowEveryone === false) {
                                config.Id = smart.Id;
                                if (config.startDate != null && config.startDate != undefined && config.startDate != "") {
                                    config.startDate = new Date(config.startDate);
                                }
                                if (config.endDate != null && config.endDate != undefined && config.endDate != "") {
                                    config.endDate = new Date(config.endDate);
                                }
                                if (config.startDateWorkingAction != null && config.startDateWorkingAction != undefined && config.startDateWorkingAction != "") {
                                    config.startDateWorkingAction = new Date(config.startDateWorkingAction);
                                }
                                if (config.endDateWorkingAction != null && config.endDateWorkingAction != undefined && config.endDateWorkingAction != "") {
                                    config.endDateWorkingAction = new Date(config.endDateWorkingAction);
                                }
                                copyCreateMeSmartFavorites.push(config);
                            }
                        })
                        setEveryoneSmartFavorites([...copyEveryoneSmartFavorites]);
                        setCreateMeSmartFavorites([...copyCreateMeSmartFavorites]);
                    }

                })
            })
    }
    const handleOpenSamePage = (items: any, filterSmaePage: any) => {
        if (items.Id && filterSmaePage) {
            if (AllSiteTasksDataLoadAll?.length > 0) {
                allTastsData = [];
                allTastsData = allTastsData.concat(AllSiteTasksDataLoadAll);
            }
            item?.setLoaded(false);
            setFlatView(true);
            setUpdatedSmartFilter(true);
            loadAdminConfigurationsId(items?.Id);
        }
    };

    const handleUpdateFaborites = (editData: any) => {
        if (editData?.startDate) {
            editData.startDate = new Date(editData.startDate)
        } if (editData?.endDate) {
            editData.endDate = new Date(editData.endDate)
        }
        if (editData?.startDateWorkingAction) {
            editData.startDateWorkingAction = new Date(editData.startDateWorkingAction)
        } if (editData?.endDateWorkingAction) {
            editData.endDateWorkingAction = new Date(editData.endDateWorkingAction)
        }
        setUpdatedEditData(editData)
        setSelectedFilterPanelIsOpenUpdate(true);
    }
    const deleteTask = async (itemId: any) => {
        let confirmDelete = confirm("Are you sure, you want to delete this?");
        if (confirmDelete) {
            await web.lists
                .getById(item?.ContextValue?.AdminconfigrationID)
                .items.getById(itemId.Id)
                .recycle()
                .then((i: any) => {
                    loadAdminConfigurations();
                });
        }
    };


    ///////////////////////////////+++++++++++++++++++++ team User Selection + ///////////////////////////////////////////////////
    const handleTeamMemberClick = async (user: any, groupIndex: number) => {
        const isChecked = !user.checked;
        const eventId = "FilterTeamMembers";

        let updatedTaskUsersData = [...TaskUsersData];
        updatedTaskUsersData[groupIndex].values = updatedTaskUsersData[groupIndex]?.values?.map((item: any) => {
            if (item.Id === user.Id) {
                return {
                    ...item,
                    checked: isChecked
                };
            }
            return item;
        });
        const checkedIds = updatedTaskUsersData[groupIndex]?.values?.filter((item: any) => item.checked).map((item: any) => item.Id);
        await onCheck(checkedIds, groupIndex, eventId);
        setTaskUsersData(updatedTaskUsersData);
    }
    const isGroupChecked = (MainGroup: any, Group: any) => {
        const mainGroupChecked = MainGroup?.checked ?? []; const groupChildren = Group?.children ?? [];
        const filteredChecked = mainGroupChecked?.filter((checkedItem: any) => groupChildren?.some((child: any) => child.Id == checkedItem && child?.ParentID !== "0"));
        let val = false; let countk = 0;
        groupChildren.forEach((el: any, index: any) => { let found: any = filteredChecked?.map((e: any) => { return e == el.Id ? true : false }); if (found) { countk = countk + 1; } }); if (countk === filteredChecked.length) { val = true; } return val == true ? true : false;
    };
    ///////////////////////////////+++++++++++++++++++++ team User Selection end + ///////////////////////////////////////////////////
    return (
        <>
            {progressBar && <PageLoader />}
            {item?.webPartTemplateSmartFilter != true && <div className='justify-content-end d-flex'>
                {isSmartFevShowHide === true && <div>
                    <a className='hreflink' onClick={() => OpenSmartfavorites('goToSmartFilter')}>Go to Smart Filter</a>
                </div>}
            </div>}

            <section className='smartFilter bg-f5f5 border mb-2 col'>
                {isSmartFevShowHide === false && <>
                    <section className="p-0 smartFilterSection">
                        <div className="px-2 py-1">
                            <div className="togglebox">
                                <div className='alignCenter justify-content-between col-sm-12'>
                                    <div className='alignCenter col-sm-8' style={{ color: `${portfolioColor}` }} onClick={() => { toggleIcon(); toggleAllExpendCloseUpDown(iconIndex) }}>
                                        {icons[iconIndex]} <span className="f-16 fw-semibold hreflink ms-2 pe-1 allfilter">All Filters -</span>
                                        <div className="f-14" style={{ color: "#333333" }}>
                                            {sitesCountInfo === "" && projectCountInfo === "" && CategoriesandStatusInfo === "" && clientCategoryCountInfo === "" && teamMembersCountInfo === "" && dateCountInfo === "" ? "No filters selected yet. Select the parameters to filter" :
                                                sitesCountInfo + ' ' + projectCountInfo + ' ' + CategoriesandStatusInfo + ' ' + clientCategoryCountInfo + ' ' + teamMembersCountInfo + ' ' + dateCountInfo
                                            }
                                        </div>
                                    </div>
                                    <div className='alignCenter col-sm-4'>
                                        <div className='ml-auto alignCenter'>
                                            {item?.DashBoardCall != true && <>
                                                <a className="hreflink" onClick={() => setSmartFilterTypePannel(true)}><div className="alignIcon svg__iconbox svg__icon--setting hreflink me-1"></div></a>
                                                <span style={{ color: `#333` }} className='me-1'>Flat View</span>
                                                <label className="switch me-2" htmlFor="checkbox">
                                                    <input checked={flatView} onChange={handleSwitchToggle} type="checkbox" id="checkbox" />
                                                    {flatView === true ? <div className="slider round" title='Switch to Groupby View' style={{ backgroundColor: `${portfolioColor}`, borderColor: `${portfolioColor}` }}></div> : <div title='Switch to Flat-View' className="slider round"></div>}
                                                </label>
                                                <div className="ml-auto" >{sitesCountInfo !== "" && CategoriesandStatusInfo !== "" ? <><button className=" btnCol btn btn-primary me-1" onClick={() => setSelectedFilterPanelIsOpen(true)}>Add Smart Favorites</button> <button className="btnCol btn btn-primary" onClick={() => OpenSmartfavorites('goToSmartFavorites')}>Go to Smart Favorites</button></> : <a className="hreflink" style={{ color: "#918d8d" }}>Add Smart Favorite</a>}</div>
                                            </>}
                                            <div className="ms-1">
                                                <Tooltip ComponentId={1651} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <label className="toggler full_width active">
                                    <span className='full-width' style={{ color: `${portfolioColor}` }} onClick={() => showSmartFilter("isKeywordsExpendShow")}>
                                        <div className='alignCenter'>
                                            {isKeywordsExpendShow === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Keywords</span>
                                        </div>

                                    </span>
                                </label>
                                {isKeywordsExpendShow === true ? <div className='mb-3 ms-20 mt-2 pt-1' style={{ borderTop: "1.5px solid #BDBDBD" }}>
                                    <div className='col-7 pt-2'>
                                        <div className='input-group alignCenter'>
                                            <label className="full-width form-label"></label>
                                            <input className="form-control" placeholder='Keywords' type='text' value={keyWordSearchTearm} onChange={handleInputChange}></input>
                                        </div></div>
                                    <div className='alignCenter mt-1'>
                                        <label className='SpfxCheckRadio me-3'>
                                            <input className='radio' type='radio' value="Allwords" checked={selectedKeyWordFilter === "Allwords"} onChange={() => setKeyWordSelected("Allwords")} /> All words
                                        </label>
                                        <label className='SpfxCheckRadio me-3'>
                                            <input className='radio' type='radio' value="Anywords" checked={selectedKeyWordFilter === "Anywords"} onChange={() => setKeyWordSelected("Anywords")} /> Any words
                                        </label>
                                        <label className='SpfxCheckRadio'>
                                            <input className='radio' type='radio' value="ExactPhrase" checked={selectedKeyWordFilter === "ExactPhrase"} onChange={() => setKeyWordSelected("ExactPhrase")} /> Exact Phrase
                                        </label>
                                        <span className='mx-2'> | </span>
                                        <label className='SpfxCheckRadio m-0'>
                                            <input className='radio' type='radio' value="Title" checked={selectedKeyDefultTitle === "Title"} onChange={() => setSelectedKeyDefultTitle("Title")} />Title
                                        </label>
                                    </div>
                                </div> : ''}
                            </div>
                        </div >
                    </section> : ''}

                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <label className="toggler full_width active">
                                    <span className='full-width' style={{ color: `${portfolioColor}` }} onClick={() => showSmartFilter("isProjectExpendShow")}>
                                        <div className='alignCenter'>
                                            {isProjectExpendShow === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Project</span> <div className="ms-2 f-14" style={{ color: "#333333" }}>{projectCountInfo ? '-' + projectCountInfo : ''}</div>
                                        </div>
                                    </span>
                                </label>
                                {isProjectExpendShow === true ? <div className='mb-3 ms-20 mt-2 pt-2' style={{ borderTop: "1.5px solid #BDBDBD" }}>
                                    <div className='d-flex justify-content-between'>
                                        <div className="col-12">
                                            <div className='d-flex'>
                                                <div className="col-7 p-0">
                                                    <div className="input-group alignCenter">
                                                        <label className="full-width form-label"></label>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="Search Project"
                                                            value={ProjectSearchKey}
                                                            onChange={(e) => autoSuggestionsForProject(e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-5 p-0 mt-1" onClick={() => setProjectManagementPopup(true)} title="Project Items Popup" >
                                                    <div className='ms-2' role='button' style={{ color: `${portfolioColor}` }}>Select Project</div>
                                                </div>
                                            </div>


                                            {SearchedProjectData?.length > 0 ? (
                                                <div className="SmartTableOnTaskPopup col-sm-7">
                                                    <ul className="list-group">
                                                        {SearchedProjectData?.map((item: any) => {
                                                            return (
                                                                <li className="hreflink list-group-item rounded-0 p-1 list-group-item-action" key={item.id} onClick={() => SelectProjectFromAutoSuggestion(item)} >
                                                                    <a>{item.Title}</a>
                                                                </li>
                                                            )
                                                        }
                                                        )}
                                                    </ul>
                                                </div>) : null}
                                            {selectedProject != undefined && selectedProject.length > 0 ?
                                                <div className='col-7'>
                                                    {selectedProject?.map((ProjectData: any, index: any) => {
                                                        return (
                                                            <div className="block w-100">
                                                                <a className="hreflink wid90" target="_blank" data-interception="off" href={`https://hhhhteams.sharepoint.com/sites/HHHH/SP/SitePages/PX-Profile.aspx?ProjectId=${ProjectData.Id}`}>
                                                                    {ProjectData.Title}
                                                                </a>
                                                                <span onClick={() => RemoveSelectedProject(index)} className="bg-light hreflink ml-auto svg__icon--cross svg__iconbox"></span>
                                                            </div>
                                                        )
                                                    })}
                                                </div> : null}
                                        </div>
                                    </div>
                                </div> : ''}
                            </div>
                        </div >
                    </section> : ''}

                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <span>
                                    <label className="toggler full_width active">
                                        <span className='full-width' style={{ color: `${portfolioColor}` }} onClick={() => showSmartFilter("isSitesExpendShow")}>
                                            <div className='alignCenter'>
                                                {isSitesExpendShow === true ?
                                                    <SlArrowDown style={{ color: "#555555", width: '12px' }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} />}
                                                <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Sites</span><div className="ms-2 f-14" style={{ color: "#333333" }}>{sitesCountInfo ? '- ' + sitesCountInfo : ''}</div>
                                            </div>


                                        </span>
                                    </label>
                                    {isSitesExpendShow === true ? <div className="togglecontent mb-3 ms-20 mt-2 pt-2" style={{ display: "block", borderTop: "1.5px solid #BDBDBD" }}>
                                        <div className="col-sm-12 pad0">
                                            <div className="togglecontent">
                                                <table width="100%" className="indicator_search">
                                                    <tr className=''>
                                                        <td valign="top" className='parentFilterSec w-100'>
                                                            {allStites != null && allStites.length > 0 &&
                                                                allStites?.map((Group: any, index: any) => {
                                                                    return (
                                                                        <div className='filterContentSec'>
                                                                            <fieldset className='pe-3 smartFilterStyle'>
                                                                                <legend className='SmartFilterHead'>
                                                                                    <span className="mparent d-flex pb-1" style={{ borderBottom: "1.5px solid #BDBDBD", color: portfolioColor }}>
                                                                                        <input className="form-check-input cursor-pointer"
                                                                                            style={Group?.values?.length === Group?.checked?.length ? { backgroundColor: portfolioColor, borderColor: portfolioColor } : Group?.selectAllChecked === true ? { backgroundColor: portfolioColor, borderColor: portfolioColor } : { backgroundColor: '', borderColor: '' }}
                                                                                            type="checkbox"
                                                                                            checked={Group?.values?.length === Group?.checked?.length ? true : Group.selectAllChecked}
                                                                                            onChange={(e) => handleSelectAll(index, e.target.checked, "filterSites")}
                                                                                            ref={(input) => {
                                                                                                if (input) {
                                                                                                    const isIndeterminate = Group?.checked?.length > 0 && Group?.checked?.length !== Group?.values?.length;
                                                                                                    input.indeterminate = isIndeterminate;
                                                                                                    if (isIndeterminate) {
                                                                                                        input.style.backgroundColor = 'transparent';
                                                                                                        input.style.borderColor = portfolioColor;
                                                                                                        const encodedData = encodeURIComponent(svgData);
                                                                                                        input.style.backgroundImage = `url("data:image/svg+xml,${encodedData}")`;
                                                                                                        input.style.border = "unset";
                                                                                                    } else {
                                                                                                        input.style.removeProperty('background-color');
                                                                                                        input.style.removeProperty('background-image');
                                                                                                        input.style.removeProperty('border');
                                                                                                        input.style.removeProperty('borderColor');
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                        <div className="fw-semibold fw-medium mx-1 text-dark">{Group.Title}</div>
                                                                                    </span>
                                                                                </legend>
                                                                                <div className="custom-checkbox-tree">
                                                                                    <CheckboxTree
                                                                                        nodes={Group.values}
                                                                                        checked={Group.checked}
                                                                                        expanded={expanded}
                                                                                        onCheck={checked => onCheck(checked, index, "filterSites")}
                                                                                        onExpand={expanded => setExpanded(expanded)}
                                                                                        nativeCheckboxes={false}
                                                                                        showNodeIcon={false}
                                                                                        checkModel={'all'}
                                                                                        icons={{
                                                                                            check: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: checkIcons }} />),
                                                                                            uncheck: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: checkBoxIcon }} />),
                                                                                            halfCheck: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: halfCheckBoxIcons }} />),
                                                                                            expandOpen: <SlArrowDown style={{ color: `#999999` }} />,
                                                                                            expandClose: <SlArrowRight style={{ color: `#999999` }} />,
                                                                                            parentClose: null,
                                                                                            parentOpen: null,
                                                                                            leaf: null,
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </fieldset>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>

                                    </div> : ""}
                                </span>
                            </div>
                        </div >
                    </section> : ''}

                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <label className="toggler full_width active">
                                    <span className='full-width' style={{ color: `${portfolioColor}` }} onClick={() => showSmartFilter("iscategoriesAndStatusExpendShow")}>
                                        <div className='alignCenter'>
                                            {iscategoriesAndStatusExpendShow === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Categories and Status</span><div className="ms-2 f-14" style={{ color: "#333333" }}>{CategoriesandStatusInfo ? '- ' + CategoriesandStatusInfo : ''}</div>
                                        </div>

                                    </span>
                                </label>
                                {iscategoriesAndStatusExpendShow === true ? <div className="togglecontent mb-3 ms-20 mt-2 pt-2" style={{ display: "block", borderTop: "1.5px solid #BDBDBD" }}>
                                    <div className="col-sm-12 pad0">
                                        <div className="togglecontent">
                                            <table width="100%" className="indicator_search">
                                                <tr className=''>
                                                    <td valign="top" className='parentFilterSec w-100'>
                                                        {filterGroupsData != null && filterGroupsData.length > 0 &&
                                                            filterGroupsData?.map((Group: any, index: any) => {
                                                                return (
                                                                    <div className='filterContentSec'>
                                                                        <fieldset className='smartFilterStyle'>
                                                                            <legend className='SmartFilterHead'>
                                                                                <span className="mparent d-flex pb-1" style={{ borderBottom: "1.5px solid #BDBDBD", color: portfolioColor }}>
                                                                                    <input className={"form-check-input cursor-pointer"}
                                                                                        style={(Group.selectAllChecked == undefined || Group.selectAllChecked === false) && Group?.ValueLength === Group?.checked?.length ? { backgroundColor: portfolioColor, borderColor: portfolioColor } : Group?.selectAllChecked === true ? { backgroundColor: portfolioColor, borderColor: portfolioColor } : { backgroundColor: '', borderColor: '' }}
                                                                                        type="checkbox"
                                                                                        checked={(Group.selectAllChecked == undefined || Group.selectAllChecked === false) && Group?.ValueLength === Group?.checked?.length ? true : Group.selectAllChecked}
                                                                                        onChange={(e) => handleSelectAll(index, e.target.checked, "FilterCategoriesAndStatus")}
                                                                                        ref={(input) => {
                                                                                            if (input) {
                                                                                                const isIndeterminate = Group?.checked?.length > 0 && Group?.checked?.length !== Group?.ValueLength;
                                                                                                input.indeterminate = isIndeterminate;
                                                                                                if (isIndeterminate) {
                                                                                                    input.style.backgroundColor = 'transparent';
                                                                                                    input.style.borderColor = portfolioColor;
                                                                                                    const encodedData = encodeURIComponent(svgData);
                                                                                                    input.style.backgroundImage = `url("data:image/svg+xml,${encodedData}")`;
                                                                                                    input.style.border = "unset";
                                                                                                } else {
                                                                                                    input.style.removeProperty('background-color');
                                                                                                    input.style.removeProperty('background-image');
                                                                                                    input.style.removeProperty('border');
                                                                                                    input.style.removeProperty('borderColor');
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <div className="fw-semibold fw-medium mx-1 text-dark">{Group.Title}</div>
                                                                                </span>
                                                                            </legend>
                                                                            <div className="custom-checkbox-tree">
                                                                                <CheckboxTree
                                                                                    nodes={Group.values}
                                                                                    checked={Group.checked}
                                                                                    expanded={expanded}
                                                                                    onCheck={checked => onCheck(checked, index, "FilterCategoriesAndStatus")}
                                                                                    onExpand={expanded => setExpanded(expanded)}
                                                                                    nativeCheckboxes={false}
                                                                                    showNodeIcon={false}
                                                                                    checkModel={'all'}
                                                                                    icons={{
                                                                                        check: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: checkIcons }} />),
                                                                                        uncheck: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: checkBoxIcon }} />),
                                                                                        halfCheck: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: halfCheckBoxIcons }} />),
                                                                                        expandOpen: <SlArrowDown style={{ color: `#999999` }} />,
                                                                                        expandClose: <SlArrowRight style={{ color: `#999999` }} />,
                                                                                        parentClose: null,
                                                                                        parentOpen: null,
                                                                                        leaf: null,
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </fieldset>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                </div> : ""}
                            </div>
                        </div >
                    </section> : ''}

                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1" >
                        <div className="px-2">
                            <div className="togglebox">
                                <label className="toggler full_width active">
                                    <span className='full-width' style={{ color: `${portfolioColor}` }} onClick={() => showSmartFilter("isClientCategory")}>
                                        <div className='alignCenter'>
                                            {isClientCategory === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Client Category</span><div className="ms-2 f-14" style={{ color: "#333333" }}>{clientCategoryCountInfo ? '- ' + clientCategoryCountInfo : ''}</div>
                                        </div>

                                    </span>
                                </label>
                                {isClientCategory === true ? <div className="togglecontent mb-3 ms-20 mt-2 pt-2" style={{ display: "block", borderTop: "1.5px solid #BDBDBD" }}>
                                    <div className="col-sm-12">
                                        <div className="togglecontent">
                                            <table width="100%" className="indicator_search">
                                                <tr>
                                                    <td valign="top" className='parentFilterSec w-100'>
                                                        {allFilterClintCatogryData != null && allFilterClintCatogryData.length > 0 &&
                                                            allFilterClintCatogryData?.map((Group: any, index: any) => {
                                                                return (

                                                                    <div className='filterContentSec'>
                                                                        <fieldset className='smartFilterStyle'>
                                                                            <legend className='SmartFilterHead'>
                                                                                <span className="mparent d-flex pb-1" style={{ borderBottom: "1.5px solid #BDBDBD", color: portfolioColor }}>
                                                                                    <input className={"form-check-input cursor-pointer"}
                                                                                        style={(Group.selectAllChecked == undefined || Group.selectAllChecked === false) && Group?.ValueLength === Group?.checked?.length ? { backgroundColor: portfolioColor, borderColor: portfolioColor } : Group?.selectAllChecked === true ? { backgroundColor: portfolioColor, borderColor: portfolioColor } : { backgroundColor: '', borderColor: '' }}
                                                                                        type="checkbox"
                                                                                        checked={(Group.selectAllChecked == undefined || Group.selectAllChecked === false) && Group?.ValueLength === Group?.checked?.length ? true : Group.selectAllChecked}
                                                                                        onChange={(e) => handleSelectAll(index, e.target.checked, "ClintCatogry")}
                                                                                        ref={(input) => {
                                                                                            if (input) {
                                                                                                const isIndeterminate = Group?.checked?.length > 0 && Group?.checked?.length !== Group?.ValueLength;
                                                                                                input.indeterminate = isIndeterminate;
                                                                                                if (isIndeterminate) {
                                                                                                    input.style.backgroundColor = 'transparent';
                                                                                                    input.style.borderColor = portfolioColor;
                                                                                                    const encodedData = encodeURIComponent(svgData);
                                                                                                    input.style.backgroundImage = `url("data:image/svg+xml,${encodedData}")`;
                                                                                                    input.style.border = "unset";
                                                                                                } else {
                                                                                                    input.style.removeProperty('background-color');
                                                                                                    input.style.removeProperty('background-image');
                                                                                                    input.style.removeProperty('border');
                                                                                                    input.style.removeProperty('borderColor');
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <div className="fw-semibold fw-medium mx-1 text-dark">{Group.Title}</div>
                                                                                </span>
                                                                            </legend>
                                                                            <div className="custom-checkbox-tree">
                                                                                <CheckboxTree
                                                                                    nodes={Group.values}
                                                                                    checked={Group.checked}
                                                                                    expanded={expanded}
                                                                                    onCheck={checked => onCheck(checked, index, "ClintCatogry")}
                                                                                    onExpand={expanded => setExpanded(expanded)}
                                                                                    nativeCheckboxes={false}
                                                                                    showNodeIcon={false}
                                                                                    checkModel={'all'}
                                                                                    icons={{
                                                                                        check: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: checkIcons }} />),
                                                                                        uncheck: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: checkBoxIcon }} />),
                                                                                        halfCheck: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: halfCheckBoxIcons }} />),
                                                                                        expandOpen: <SlArrowDown style={{ color: `#999999`, height: "1em", width: "1em" }} />,
                                                                                        expandClose: <SlArrowRight style={{ color: `#999999`, height: "1em", width: "1em" }} />,
                                                                                        parentClose: null,
                                                                                        parentOpen: null,
                                                                                        leaf: null,
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </fieldset>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                </div> : ""}
                            </div>

                        </div>
                    </section> : ''}

                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <label className="toggler full_width active">
                                    <span className='full_width' style={{ color: `${portfolioColor}` }} onClick={() => showSmartFilter("isActionsExpendShow")}>
                                        <div className='alignCenter'>
                                            {isActionsExpendShow === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Working Actions</span><div className="ms-2 f-14" style={{ color: "#333333" }}>{(isPhone || isBottleneck || isAttention) ? `Working Action: (${(isPhone && isBottleneck && isAttention) ? "All" : [isPhone ? "Phone" : "", isBottleneck ? "Bottleneck" : "", isAttention ? "Attention" : ""].filter(Boolean).join(', ')})` : ""}</div>
                                        </div>

                                    </span>
                                </label>
                                {isActionsExpendShow === true ? <div className="togglecontent mb-3 ms-20 mt-2 pt-2" style={{ display: "block", borderTop: "1.5px solid #BDBDBD" }}>
                                    <div className="col-sm-12 pad0">
                                        <div className="togglecontent">
                                            <table width="100%" className="indicator_search">
                                                <tr className=''>
                                                    <td valign="top" className='parentFilterSec w-100'>
                                                        {isWorkingActions != null && isWorkingActions.length > 0 &&
                                                            isWorkingActions?.map((Group: any, index: any) => {
                                                                return (
                                                                    <div className='filterContentSec workingActionSection'>
                                                                        <fieldset className='pe-3 smartFilterStyle'>
                                                                            <div className="custom-checkbox-tree">
                                                                                <CheckboxTree
                                                                                    nodes={Group.values}
                                                                                    checked={Group.checked}
                                                                                    expanded={expanded}
                                                                                    onCheck={checked => onCheck(checked, index, "WorkingAction")}
                                                                                    onExpand={expanded => setExpanded(expanded)}
                                                                                    nativeCheckboxes={false}
                                                                                    showNodeIcon={false}
                                                                                    checkModel={'all'}
                                                                                    icons={{
                                                                                        check: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: checkIcons }} />),
                                                                                        uncheck: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: checkBoxIcon }} />),
                                                                                        halfCheck: (<div className='checkBoxIcons' dangerouslySetInnerHTML={{ __html: halfCheckBoxIcons }} />),
                                                                                        expandOpen: <SlArrowDown style={{ color: `#999999` }} />,
                                                                                        expandClose: <SlArrowRight style={{ color: `#999999` }} />,
                                                                                        parentClose: null,
                                                                                        parentOpen: null,
                                                                                        leaf: null,
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </fieldset>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div> : ""}
                            </div>
                        </div >
                    </section> : ''}

                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <div className="toggler full_width active">
                                    <span className='full_width' style={{ color: `${portfolioColor}` }}>
                                        <div className='alignCenter'>
                                            {isTeamMembersExpendShow === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} onClick={() => showSmartFilter("isTeamMembersExpendShow")} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} onClick={() => showSmartFilter("isTeamMembersExpendShow")} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold me-2'>Team</span>
                                            <div className="f-14 me-2" style={{ color: "#333333" }}>{TaskUsersData?.some((e) => e.checked?.length > 0) ? '- ' : ''}</div>
                                            {
                                                TaskUsersData?.map((Group: any, index: any) => {
                                                    return (
                                                        <div className='filterContentSec'>
                                                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                                {Group?.values?.map((user: any) => {
                                                                    const isSelected = Group?.checked?.some((selectedUser: any) => selectedUser === user.Id);
                                                                    return isSelected && (
                                                                        <>
                                                                            <div
                                                                                key={user.Id}
                                                                                style={{
                                                                                    marginRight: "2px",
                                                                                    marginBottom: "4px",
                                                                                    cursor: "pointer",
                                                                                    border: isSelected ? "2px solid var(--SiteBlue)" : "2px solid transparent",
                                                                                    borderRadius: "50%",
                                                                                }}
                                                                                onClick={() => handleTeamMemberClick(user, index)}
                                                                            >
                                                                                <Avatar
                                                                                    className="UserImage"
                                                                                    title={user.Title}
                                                                                    name={user.Title}
                                                                                    image={user?.Item_x0020_Cover?.Url ? { src: user.Item_x0020_Cover.Url } : undefined}
                                                                                    initials={!user?.Item_x0020_Cover?.Url ? user.Suffix : undefined}
                                                                                />
                                                                            </div>
                                                                        </>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </span>
                                </div>
                                {isTeamMembersExpendShow === true ? <div className="togglecontent mb-3 ms-20 mt-2 pt-2" style={{ display: "block", borderTop: "1.5px solid #BDBDBD" }}>
                                    <div className="col-sm-12 pad0">
                                        <div className="togglecontent mt-1">
                                            <table width="100%" className="indicator_search">
                                                <tr className=''>
                                                    <td valign="top" className='parentFilterSec w-100'>
                                                        {TaskUsersData != null && TaskUsersData.length > 0 &&
                                                            TaskUsersData?.map((Group: any, index: any) => {
                                                                return (

                                                                    Group?.values != undefined && Group?.values?.length > 0 && (<div className='filterContentSec'>
                                                                        <fieldset className='smartFilterStyle'>
                                                                            <legend className='SmartFilterHead'>
                                                                                < span className="mparent d-flex pb-1" style={{ borderBottom: "1.5px solid #BDBDBD", color: portfolioColor }}>
                                                                                    <input className={"form-check-input cursor-pointer"}
                                                                                        style={Group.selectAllChecked == undefined && Group?.values?.length === Group?.checked?.length ? { backgroundColor: portfolioColor, borderColor: portfolioColor } : Group?.selectAllChecked === true ? { backgroundColor: portfolioColor, borderColor: portfolioColor } : { backgroundColor: '', borderColor: '' }}
                                                                                        type="checkbox"
                                                                                        checked={Group.selectAllChecked == undefined && Group?.values?.length === Group?.checked?.length ? true : Group.selectAllChecked}
                                                                                        onChange={(e) => handleSelectAll(index, e.target.checked, "FilterTeamMembers")}
                                                                                        ref={(input) => {
                                                                                            if (input) {
                                                                                                const isIndeterminate = Group?.checked?.length > 0 && Group?.checked?.length !== Group?.values?.length;
                                                                                                input.indeterminate = isIndeterminate;
                                                                                                if (isIndeterminate) {
                                                                                                    input.style.backgroundColor = 'transparent';
                                                                                                    input.style.borderColor = portfolioColor;
                                                                                                    const encodedData = encodeURIComponent(svgData);
                                                                                                    input.style.backgroundImage = `url("data:image/svg+xml,${encodedData}")`;
                                                                                                    input.style.border = "unset";
                                                                                                } else {
                                                                                                    input.style.removeProperty('background-color');
                                                                                                    input.style.removeProperty('background-image');
                                                                                                    input.style.removeProperty('border');
                                                                                                    input.style.removeProperty('borderColor');
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <div className="fw-semibold fw-medium mx-1 text-dark">{Group.Title}</div>
                                                                                </span>
                                                                            </legend>
                                                                            <div className="custom-checkbox-tree">
                                                                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                                                    {Group?.values?.map((user: any) => {
                                                                                        const isSelected = Group?.checked?.some((selectedUser: any) => selectedUser === user.Id);
                                                                                        return (
                                                                                            <>
                                                                                                <div
                                                                                                    key={user.Id}
                                                                                                    style={{
                                                                                                        marginRight: "2px",
                                                                                                        marginBottom: "4px",
                                                                                                        cursor: "pointer",
                                                                                                        border: isSelected ? "2px solid var(--SiteBlue)" : "2px solid transparent",
                                                                                                        borderRadius: "50%"
                                                                                                    }}
                                                                                                    onClick={() => handleTeamMemberClick(user, index)}
                                                                                                >
                                                                                                    <Avatar
                                                                                                        className="UserImage"
                                                                                                        title={user.Title}
                                                                                                        name={user.Title}
                                                                                                        image={user?.Item_x0020_Cover?.Url ? { src: user.Item_x0020_Cover.Url } : undefined}
                                                                                                        initials={!user?.Item_x0020_Cover?.Url ? user.Suffix : undefined}

                                                                                                    />
                                                                                                </div>


                                                                                            </>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </fieldset>
                                                                    </div>)
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div> : ""}
                            </div>
                        </div >
                    </section> : ''}

                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <div className="toggler full_width active">
                                    <span className='full_width' style={{ color: `${portfolioColor}` }}>
                                        <div className='alignCenter'>
                                            {isTeamMemberActivities === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} onClick={() => showSmartFilter("isTeamMemberActivities")} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} onClick={() => showSmartFilter("isTeamMemberActivities")} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Team Member Activities</span>
                                            <div className="ms-2 f-14" style={{ color: "#333333" }}>{(isCreatedBy || isModifiedby || isAssignedto || isTeamLead || isTeamMember) ? `- ${(isCreatedBy && isModifiedby && isAssignedto && isTeamLead && isTeamMember) ? "All" : [isCreatedBy ? "Created by" : "", isModifiedby ? "Modified by" : "", isAssignedto ? "Working Member" : "", isTeamLead ? "Team Lead" : "", isTeamMember ? "Team Member" : ""].filter(Boolean).join(', ')}` : ""}</div>
                                            <div className='me-3 d-end'>
                                                <input className='form-check-input' type="checkbox" value="isSelectAll" checked={isSelectAll} onChange={handleSelectAllChangeTeamSection} /> Select All
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                {isTeamMemberActivities === true ? <div className="togglecontent mb-3 ms-20 mt-2 pt-2" style={{ display: "block", borderTop: "1.5px solid #BDBDBD" }}>
                                    <Col className='mb-2 '>
                                        <label className='me-3'>
                                            <input className='form-check-input' type="checkbox" value="isCretaedBy" checked={isCreatedBy} onChange={() => setIsCreatedBy(!isCreatedBy)} /> Created by
                                        </label>
                                        <label className='me-3'>
                                            <input className='form-check-input' type="checkbox" value="isModifiedBy" checked={isModifiedby} onChange={() => setIsModifiedby(!isModifiedby)} /> Modified by
                                        </label>
                                        <label className='me-3'>
                                            <input className='form-check-input' type="checkbox" value="isAssignedBy" checked={isAssignedto} onChange={() => setIsAssignedto(!isAssignedto)} /> Working Member
                                        </label>
                                        <label className='me-3'>
                                            <input className='form-check-input' type="checkbox" value="isTeamLead" checked={isTeamLead} onChange={() => setIsTeamLead(!isTeamLead)} /> Team Lead
                                        </label>
                                        <label className='me-3'>
                                            <input className='form-check-input' type="checkbox" value="isTeamMember" checked={isTeamMember} onChange={() => setIsTeamMember(!isTeamMember)} /> Team Member
                                        </label>
                                    </Col>
                                </div> : ""}
                            </div>
                        </div >
                    </section> : ''}


                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <div className="toggler full_width active">
                                    <span className="full-width" style={{ color: `${portfolioColor}` }}>
                                        <div className='alignCenter'>
                                            <div>
                                                {isDateExpendShowWorkingAction === true ?
                                                    <SlArrowDown style={{ color: "#555555", width: '12px' }} onClick={(e: any) => { showSmartFilter("isDateExpendShowWorkingAction") }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} onClick={(e) => { showSmartFilter("isDateExpendShowWorkingAction") }} />}
                                                <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Working Date</span>
                                            </div>
                                            <div className="ms-2 f-14">
                                                <input className="form-check-input" id="workingDateCheckbox" name="workingDateCheckbox" type="checkbox" value="isWorkingDate" checked={isWorkingDate} onChange={() => setIsWorkingDate(!isWorkingDate)} />{" "}
                                                <label htmlFor=""></label>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                {isDateExpendShowWorkingAction === true ? <div className="togglecontent mb-3 ms-20 mt-2 pt-2" style={{ display: "block", borderTop: "1.5px solid #BDBDBD" }}>
                                    <div className="col-sm-12">
                                        {/* <Col className='mb-2'>
                                            <label className="me-3">
                                                <input className="form-check-input" type="checkbox" value="isWorkingDate" checked={isWorkingDate} onChange={() => setIsWorkingDate(!isWorkingDate)} />{" "}
                                                Working Date
                                            </label>
                                        </Col> */}
                                        <Col className='my-2'>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter" className='radio' value="today" checked={selectedFilterWorkingAction === "today"} onChange={handleDateFilterChangeWorkingAction} />
                                                <label className='ms-1'>Today</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter" value="tomorrow" className='radio' checked={selectedFilterWorkingAction === "tomorrow"} onChange={handleDateFilterChangeWorkingAction} />
                                                <label className='ms-1'>Tomorrow</label>
                                            </span >
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter" value="thisweek" className='radio' checked={selectedFilterWorkingAction === "thisweek"} onChange={handleDateFilterChangeWorkingAction} />
                                                <label className='ms-1'>This Week</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter" value="nextweek" className='radio' checked={selectedFilterWorkingAction === "nextweek"} onChange={handleDateFilterChangeWorkingAction} />
                                                <label className='ms-1'>Next week</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter" value="thismonth" className='radio' checked={selectedFilterWorkingAction === "thismonth"} onChange={handleDateFilterChangeWorkingAction} />
                                                <label className='ms-1'>This Month</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter" value="nextmonth" className='radio' checked={selectedFilterWorkingAction === "nextmonth"} onChange={handleDateFilterChangeWorkingAction} />
                                                <label className='ms-1'> Next month</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter" value="custom" className='radio' onChange={handleDateFilterChangeWorkingAction}
                                                    checked={selectedFilterWorkingAction === "custom" || (startDateWorkingAction !== null && endDateWorkingAction !== null && !selectedFilterWorkingAction)} />
                                                <label className='ms-1'>Custom</label>
                                            </span>
                                        </Col>
                                        <div>
                                            <div className='alignCenter gap-4'>
                                                <div className="col-2 dateformate ps-0" style={{ width: "160px" }}>
                                                    <div className="input-group">
                                                        <label className='mb-1 form-label full-width'>Start Date</label>
                                                        <DatePicker selected={startDateWorkingAction} onChange={(date) => setStartDateWorkingAction(date)} dateFormat="dd MMM yyyy" // Format as DD/MM/YYYY
                                                            className="form-control date-picker" popperPlacement="bottom-start" customInput={<ExampleCustomInput />}
                                                            maxDate={endDateWorkingAction}
                                                            renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled
                                                            }) => (<div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
                                                                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{"<"}</button>
                                                                <select value={date.getFullYear()} onChange={({ target: { value } }: any) => changeYear(value)}>{years.map((option) => (<option key={option} value={option}>{option}</option>))}</select>
                                                                <select value={months[date.getMonth()]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>{months.map((option) => (<option key={option} value={option}>{option} </option>))}</select>
                                                                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} >{">"}</button>
                                                            </div>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-2 dateformate" style={{ width: "160px" }}>
                                                    <div className="input-group">
                                                        <label className='mb-1 form-label full-width'>End Date</label>
                                                        <DatePicker selected={endDateWorkingAction} onChange={(date) => setEndDateWorkingAction(date)} dateFormat="dd MMM yyyy"
                                                            className="form-control date-picker" popperPlacement="bottom-start" customInput={<ExampleCustomInput />}
                                                            minDate={startDateWorkingAction}
                                                            renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled
                                                            }) => (<div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
                                                                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{"<"}</button>
                                                                <select value={date.getFullYear()} onChange={({ target: { value } }: any) => changeYear(value)}>{years.map((option) => (<option key={option} value={option}>{option}</option>))}</select>
                                                                <select value={months[date.getMonth()]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>{months.map((option) => (<option key={option} value={option}>{option} </option>))}</select>
                                                                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} >{">"}</button>
                                                            </div>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-2 mt-2 m-0 pull-left">
                                                    <label className="hreflink pt-3" title="Clear Date Filters" onClick={clearDateFiltersWorkingAction} ><span style={{ color: `${portfolioColor}` }} >Clear</span></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : ""}

                            </div>
                        </div >
                    </section> : ''}

                    {collapseAll == false ? <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <label className="toggler full_width active">
                                    <span className="full-width" style={{ color: `${portfolioColor}` }} onClick={() => showSmartFilter("isDateExpendShow")}>
                                        <div className='alignCenter'>
                                            {isDateExpendShow === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Date</span><div className="ms-2 f-14" style={{ color: "#333333" }}>{dateCountInfo ? '- ' + dateCountInfo : ''}</div>
                                        </div>
                                    </span>
                                </label>
                                {isDateExpendShow === true ? <div className="togglecontent mb-3 ms-20 mt-2 pt-1" style={{ display: "block", borderTop: "1.5px solid #BDBDBD" }}>
                                    <div className="col-sm-12 pt-2">
                                        <Col className='mb-2'>
                                            <label className="me-3">
                                                <input className="form-check-input" type="checkbox" value="isCretaedDate" checked={isCreatedDateSelected} onChange={() => setIsCreatedDateSelected(!isCreatedDateSelected)} />{" "}
                                                Created Date
                                            </label>
                                            <label className="me-3">
                                                <input
                                                    className="form-check-input" type="checkbox" value="isModifiedDate" checked={isModifiedDateSelected} onChange={() => setIsModifiedDateSelected(!isModifiedDateSelected)} />{" "}
                                                Modified Date
                                            </label>
                                            <label className="me-3">
                                                <input className="form-check-input" type="checkbox" value="isDueDate" checked={isDueDateSelected} onChange={() => setIsDueDateSelected(!isDueDateSelected)} />{" "}
                                                Due Date
                                            </label>
                                        </Col>
                                        <Col className='my-3'>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter1" className='radio' value="today" checked={selectedFilter === "today"} onChange={handleDateFilterChange} />
                                                <label className='ms-1'>Today</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter2" value="yesterday" className='radio' checked={selectedFilter === "yesterday"} onChange={handleDateFilterChange} />
                                                <label className='ms-1'>Yesterday</label>
                                            </span >
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter3" value="thisweek" className='radio' checked={selectedFilter === "thisweek"} onChange={handleDateFilterChange} />
                                                <label className='ms-1'>This Week</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter4" value="last7days" className='radio' checked={selectedFilter === "last7days"} onChange={handleDateFilterChange} />
                                                <label className='ms-1'>Last 7 Days</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter5" value="thismonth" className='radio' checked={selectedFilter === "thismonth"} onChange={handleDateFilterChange} />
                                                <label className='ms-1'>This Month</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter6" value="last30days" className='radio' checked={selectedFilter === "last30days"} onChange={handleDateFilterChange} />
                                                <label className='ms-1'>Last 30 Days</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter7" value="last3months" className='radio' checked={selectedFilter === "last3months"} onChange={handleDateFilterChange} />
                                                <label className='ms-1'>Last 3 Months</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter8" value="thisyear" className='radio' checked={selectedFilter === "thisyear"} onChange={handleDateFilterChange} />
                                                <label className='ms-1'>This Year</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter9" value="lastyear" className='radio' checked={selectedFilter === "lastyear"} onChange={handleDateFilterChange} />
                                                <label className='ms-1'>Last Year</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter10" value="custom" className='radio' onChange={handleDateFilterChange}
                                                    checked={selectedFilter === "custom" || (startDate !== null && endDate !== null && !selectedFilter)} />
                                                <label className='ms-1'>Custom</label>
                                            </span>
                                            <span className='SpfxCheckRadio  me-3'>
                                                <input type="radio" name="dateFilter11" value="Pre-set" className='radio' onChange={handleDateFilterChange}
                                                    checked={selectedFilter === "Pre-set"} />
                                                <label className='ms-1'>Pre-set <span style={{ backgroundColor: `${portfolioColor}` }} onClick={() => preSetIconClick()} className="svg__iconbox svg__icon--editBox alignIcon hreflink"></span></label>
                                            </span>

                                        </Col>
                                        <div>
                                            <div className='alignCenter gap-4'>
                                                <div className="col-2 dateformate ps-0" style={{ width: "160px" }}>
                                                    <div className="input-group">
                                                        <label className='mb-1 form-label full-width'>Start Date</label>
                                                        <DatePicker selected={startDate} onChange={(date) => selectingStartDate(date)} dateFormat="dd MMM yyyy" // Format as DD/MM/YYYY
                                                            className="form-control date-picker" popperPlacement="bottom-start" customInput={<ExampleCustomInput />}
                                                            maxDate={endDate}
                                                            renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled
                                                            }) => (<div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
                                                                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{"<"}</button>
                                                                <select value={date.getFullYear()} onChange={({ target: { value } }: any) => changeYear(value)}>{years.map((option) => (<option key={option} value={option}>{option}</option>))}</select>
                                                                <select value={months[date.getMonth()]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>{months.map((option) => (<option key={option} value={option}>{option} </option>))}</select>
                                                                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} >{">"}</button>
                                                            </div>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-2 dateformate" style={{ width: "160px" }}>
                                                    <div className="input-group">
                                                        <label className='mb-1 form-label full-width'>End Date</label>
                                                        <DatePicker selected={endDate} onChange={(date) => selectingEndDate(date)} dateFormat="dd MMM yyyy" // Format as DD/MM/YYYY
                                                            className="form-control date-picker" popperPlacement="bottom-start" customInput={<ExampleCustomInput />}
                                                            minDate={startDate}
                                                            renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled
                                                            }) => (<div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
                                                                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{"<"}</button>
                                                                <select value={date.getFullYear()} onChange={({ target: { value } }: any) => changeYear(value)}>{years.map((option) => (<option key={option} value={option}>{option}</option>))}</select>
                                                                <select value={months[date.getMonth()]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>{months.map((option) => (<option key={option} value={option}>{option} </option>))}</select>
                                                                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} >{">"}</button>
                                                            </div>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-2 mt-2 m-0 pull-left">
                                                    <label className="hreflink pt-3" title="Clear Date Filters" onClick={clearDateFilters} ><span style={{ color: `${portfolioColor}` }} >Clear</span></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : ""}

                            </div>
                        </div >
                        {item?.webPartTemplateSmartFilter != true ? <div className='full-width text-end full-width me-1 my-3 pe-2 text-end'>
                            {ContextValue?.TimeEntry?.toLowerCase() == "true" && <a className="hreflink me-12" data-interception="off" target="_blank" href={item?.ContextValue?.siteUrl + "/SitePages/UserTimeEntry.aspx"}>User-Time-Entry</a>}
                            <button className='btn btn-primary me-1 px-3 py-1' onClick={() => UpdateFilterData("udateClickTrue")}>Update Filter</button>
                            <button className='btn  btn-default px-3 py-1' onClick={ClearFilter}> Clear Filters</button></div> : <div className='full-width text-end full-width me-1 my-3 pe-2 text-end'><button className='btn btn-primary me-1 px-3 py-1' onClick={() => UpdateFilterData("udateClickTrue")}>Save Filter</button></div>}
                    </section> : ''}

                </>}

                {isSmartFevShowHide === true && <>
                    <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <label className="toggler full_width active">
                                    <span className="full-width" style={{ color: `${portfolioColor}` }} onClick={() => showSmartFilter("isEveryOneShow")}>
                                        <div className='alignCenter'>
                                            {isEveryOneShow === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>All</span>
                                        </div>
                                    </span>
                                </label>
                                {isEveryOneShow === true ? <div className="togglecontent mb-3 ms-20 pt-1 mt-1" style={{ display: "block", borderTop: "1.5px solid #ccc" }}>
                                    <div className="col-sm-12">
                                        <div>{EveryoneSmartFavorites?.length > 0 && EveryoneSmartFavorites.map((item1: any) => {
                                            return (<>
                                                <div className='bg-ee my-1 p-1 w-100'>
                                                    <span className='d-flex'>
                                                        <a className='hreflink' onClick={() => handleOpenSamePage(item1, "filterSmaePage")}>{item1.Title}</a><span className='d-flex'><a className="hreflink" data-interception="off" target="_blank" style={{ color: `${portfolioColor}` }} href={`${ContextValue.siteUrl}/SitePages/Team-Portfolio.aspx${item?.IsUpdated ? `?PortfolioType=${encodeURIComponent(item?.IsUpdated)}` : ''}${item?.IsUpdated ? '&' : '?'}SmartfavoriteId=${encodeURIComponent(item1?.Id)}&smartfavorite=${encodeURIComponent(item1?.Title)}`}><span className="svg__iconbox svg__icon--openWeb"></span></a><span onClick={() => handleUpdateFaborites(item1)} className="svg__iconbox svg__icon--edit"></span> <span onClick={() => deleteTask(item1)} className="svg__icon--trash  svg__iconbox"></span></span>
                                                    </span>
                                                </div>
                                            </>)
                                        })}</div>
                                        <div>{EveryoneSmartFavorites?.length == 0 &&
                                            <div className='bg-ee my-1 p-1 w-100'>
                                                <span className='d-flex'>
                                                    No Items Available
                                                </span>
                                            </div>
                                        }</div>
                                    </div>
                                </div> : ''}
                            </div>
                        </div >
                    </section>
                    <section className="smartFilterSection p-0 mb-1">
                        <div className="px-2">
                            <div className="togglebox">
                                <label className="toggler full_width active">
                                    <span className="full-width" style={{ color: `${portfolioColor}` }} onClick={() => showSmartFilter("isOnlyMeShow")}>
                                        <div className='alignCenter'>
                                            {isOnlyMeShow === true ?
                                                <SlArrowDown style={{ color: "#555555", width: '12px' }} /> : <SlArrowRight style={{ color: "#555555", width: '12px' }} />}
                                            <span style={{ color: "#333333" }} className='ms-2 f-15 fw-semibold'>Only Me</span>
                                        </div>
                                    </span>
                                </label>
                                {isOnlyMeShow === true ? <div className="togglecontent mb-3 ms-20 pt-1 mt-1" style={{ display: "block", borderTop: "1.5px solid #ccc" }}>
                                    <div className="col-sm-12">
                                        <div>{CreateMeSmartFavorites?.length > 0 && CreateMeSmartFavorites?.map((item2: any) => {
                                            return (<>
                                                <div className='bg-ee my-1 p-1 w-100'>
                                                    <div>
                                                        <span className='d-flex'>
                                                            <a className='hreflink' onClick={() => handleOpenSamePage(item2, "filterSmaePage")}>{item2.Title}</a><span className='d-flex'><a className="hreflink" data-interception="off" target="_blank" style={{ color: `${portfolioColor}` }} href={`${ContextValue.siteUrl}/SitePages/Team-Portfolio.aspx${item?.IsUpdated ? `?PortfolioType=${encodeURIComponent(item?.IsUpdated)}` : ''}${item?.IsUpdated ? '&' : '?'}SmartfavoriteId=${encodeURIComponent(item2.Id)}&smartfavorite=${encodeURIComponent(item2?.Title)}`}><span className="svg__iconbox svg__icon--openWeb"> </span></a><span onClick={() => handleUpdateFaborites(item2)} className="svg__iconbox svg__icon--edit"></span> <span onClick={() => deleteTask(item2)} className="svg__icon--trash  svg__iconbox"></span></span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </>)
                                        })}
                                        </div>
                                        <div>{CreateMeSmartFavorites?.length == 0 &&
                                            <div className='bg-ee my-1 p-1 w-100'>
                                                <span className='d-flex'>
                                                    No Items Available
                                                </span>
                                            </div>
                                        }</div>
                                    </div>
                                </div> : ''}
                            </div>
                        </div >
                    </section>
                </>}
            </section >
            {/* ********************* this is Project Management panel ****************** */}
            {
                item?.ProjectData != undefined && item?.ProjectData?.length > 0 && ProjectManagementPopup ?
                    <ServiceComponentPortfolioPopup
                        Dynamic={item?.ContextValue}
                        Call={(DataItem: any, Type: any, functionType: any) => { callBackData(DataItem, Type, functionType) }}
                        showProject={ProjectManagementPopup}
                        selectionType='Multi'
                        props={selectedProject}
                    />
                    : null
            }
            <>{PreSetPanelIsOpen && <PreSetDatePikerPannel isOpen={PreSetPanelIsOpen} PreSetPikerCallBack={PreSetPikerCallBack} portfolioColor={portfolioColor} />}</>
            {
                selectedFilterPanelIsOpen && <TeamSmartFavoritesCopy openTableSettingPopup={item?.openTableSettingPopup} isOpen={selectedFilterPanelIsOpen} selectedFilterCallBack={selectedFilterCallBack}
                    portfolioColor={portfolioColor}
                    filterGroupsData={filterGroupsData}
                    allFilterClintCatogryData={allFilterClintCatogryData}
                    allStites={allStites}
                    isWorkingActions={isWorkingActions}
                    selectedProject={selectedProject}
                    startDate={startDate}
                    endDate={endDate}
                    startDateWorkingAction={startDateWorkingAction}
                    endDateWorkingAction={endDateWorkingAction}
                    isCreatedBy={isCreatedBy}
                    isModifiedby={isModifiedby}
                    isAssignedto={isAssignedto}
                    isTeamLead={isTeamLead}
                    isTeamMember={isTeamMember}
                    isTodaysTask={isTodaysTask}
                    isPhone={isPhone}
                    flatView={flatView}
                    isBottleneck={isBottleneck}
                    isAttention={isAttention}
                    isWorkingDate={isWorkingDate}
                    selectedFilter={selectedFilter}
                    selectedFilterWorkingAction={selectedFilterWorkingAction}
                    isCreatedDateSelected={isCreatedDateSelected}
                    isModifiedDateSelected={isModifiedDateSelected}
                    isDueDateSelected={isDueDateSelected}
                    ProjectData={item?.ProjectData}
                    ContextValue={ContextValue}
                    AllUsers={AllUsers}
                    TaskUsersData={TaskUsersData}
                />
            }
            {
                selectedFilterPanelIsOpenUpdate && updatedEditData && <TeamSmartFavoritesCopy openTableSettingPopup={item?.openTableSettingPopup} isOpen={selectedFilterPanelIsOpenUpdate} selectedFilterCallBack={selectedFilterCallBack}
                    portfolioColor={portfolioColor}
                    updatedSmartFilter={true}
                    updatedEditData={updatedEditData}
                    ProjectData={item?.ProjectData}
                    ContextValue={ContextValue}
                    AllUsers={AllUsers}
                />
            }
            {smartFilterTypePannel && <SmartfilterSettingTypePanel isGroupChecked={isGroupChecked} isOpen={smartFilterTypePannel} filterGroupsData={filterGroupsData} portfolioColor={portfolioColor} selectAllFromAbove={selectAllFromAbove} selectChild={selectChild} setSmartFilterTypePannel={setSmartFilterTypePannel} />}
        </>
    )
}
export default TeamSmartFilter;
