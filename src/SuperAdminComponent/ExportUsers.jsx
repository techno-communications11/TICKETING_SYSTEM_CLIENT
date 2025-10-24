// // import React, { useState } from 'react';
// // import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
// // import * as XLSX from 'xlsx';

// // function ExportUsers({ userData }) {
// //     const [open, setOpen] = useState(false);

// //     const handleExport = () => {
// //         // Filter users
// //         const filteredData = userData.filter(user => {
// //             const email = user.email?.toLowerCase() || "";
// //             const name = user.name?.toLowerCase() || "";

// //             // Skip gmail.com emails
// //             if (email.includes("@gmail.com")) return false;

// //             // Skip if name/email contains "test"
// //             if (email.includes("test") || name.includes("test")) return false;

// //             return true;
// //         });

// //         // Prepare export data
// //         const exportData = filteredData.map(user => ({
// //             Name: user.name,
// //             Email: user.email,
// //             Passowrd: 123456,
// //             Phone: user.phone,
// //             Market: user.market || user.markets ||'-',
// //             Department: user.department,
// //             SubDepartment: user.subDepartment || "-"
// //         }));

// //         // Convert JSON → worksheet
// //         const worksheet = XLSX.utils.json_to_sheet(exportData);

// //         // Set column widths (wch = width in characters)
// //         worksheet['!cols'] = [
// //             { wch: 20 }, // Name
// //             { wch: 30 }, // Email
// //             { wch: 15 }, // Phone
// //             { wch: 25 }, // Department
// //             { wch: 25 }, // SubDepartment
// //         ];

// //         // Create workbook
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

// //         // Export file
// //         XLSX.writeFile(workbook, "UsersData.xlsx");

// //         setOpen(false);
// //     };

// //     return (
// //         <div>
// //             <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={() => setOpen(true)}
// //             >
// //                 Export Excel
// //             </Button>

// //             {/* Confirmation Dialog */}
// //             <Dialog open={open} onClose={() => setOpen(false)}>
// //                 <DialogTitle>Confirm Export</DialogTitle>
// //                 <DialogContent>
// //                     <Typography>
// //                         Are you sure you want to export the filtered user data to Excel?
// //                     </Typography>
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={() => setOpen(false)}>Cancel</Button>
// //                     <Button
// //                         variant="contained"
// //                         // color="success"
// //                         onClick={handleExport}
// //                     >
// //                         Yes, Export
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>
// //         </div>
// //     );
// // }

// // export default ExportUsers;



// // ExportUsersWithFilters.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import {
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Typography,
//     Radio,
//     RadioGroup,
//     FormControlLabel,
//     FormControl,
//     FormLabel,
//     Checkbox,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemSecondaryAction,
//     Box,
//     Divider,
//     Autocomplete,
//     TextField,
//     Chip,
//     CircularProgress
// } from "@mui/material";
// import * as XLSX from "xlsx";
// import { getAllDepartmentsServices } from "../Services/departments.services";

// // NOTE: make sure getAllDepartmentsServices is available in scope (import it if needed)
// // import { getAllDepartmentsServices } from "path/to/services";

// function ExportUsersWithFilters({ userData }) {
//     const [open, setOpen] = useState(false);

//     // filter UI state
//     const [filterMode, setFilterMode] = useState("all"); // 'all' or 'byDepartment'
//     const [departments, setDepartments] = useState([]); // fetched departments
//     const [loadingDepartments, setLoadingDepartments] = useState(false);

//     // Selected departments: array of department ids or names (we accept both)
//     const [selectedDepartments, setSelectedDepartments] = useState([]);

//     // managerOptions holds for each deptId (or deptKey) which manager boxes are checked
//     // and selectedMarkets
//     const [managerOptions, setManagerOptions] = useState({});

//     // Markets available globally (extracted from userData) - used for Autocomplete
//     const marketsFromUsers = useMemo(() => {
//         const setMarkets = new Set();
//         (userData || []).forEach((u) => {
//             // try different keys where market could exist
//             const m = u.market || u.markets || u.marketName || u.market_id || null;
//             if (Array.isArray(m)) {
//                 m.forEach((x) => x && setMarkets.add(String(x)));
//             } else if (m != null) {
//                 setMarkets.add(String(m));
//             }
//             // also look at nested fields in case
//             if (u.markets && typeof u.markets === "string") setMarkets.add(u.markets);
//         });
//         return Array.from(setMarkets).sort();
//     }, [userData]);

//     // Utility: sanitize department objects for UI (remove email/name fields if user asked)
//     const sanitizeDepartmentsForUI = (rawDeps = []) =>
//         rawDeps.map((d, idx) => {
//             // prefer id if exists else use name else index
//             const id = d.id ?? d._id ?? d.departmentId ?? d.name ?? `dept-${idx}`;
//             const name = d.name ?? d.departmentName ?? d.title ?? String(id);
//             // Remove email or other heavy properties for display
//             const cleaned = { ...d };
//             if (cleaned.email) delete cleaned.email;
//             if (cleaned.emails) delete cleaned.emails;
//             // return shape
//             return { id, name, raw: cleaned };
//         });

//     // fetch departments when dialog opens and user selected byDepartment
//     useEffect(() => {
//         if (!open) return;

//         if (filterMode === "byDepartment" && departments.length === 0) {
//             setLoadingDepartments(true);

//             // Using the service call you referenced in your message:
//             (async () => {
//                 try {
//                     const response = await getAllDepartmentsServices();
//                     // assume response.data.data is the array
//                     const deps = response?.data?.data ?? response?.data ?? response ?? [];
//                     const sanitized = sanitizeDepartmentsForUI(deps);
//                     setDepartments(sanitized);
//                 } catch (err) {
//                     console.error("Failed to fetch departments:", err);
//                     setDepartments([]); // fallback empty
//                 } finally {
//                     setLoadingDepartments(false);
//                 }
//             })();
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [open, filterMode]);

//     // Helpers to toggle department selection
//     const toggleDepartment = (deptId) => {
//         setSelectedDepartments((prev) =>
//             prev.includes(deptId) ? prev.filter((d) => d !== deptId) : [...prev, deptId]
//         );
//         // initialize managerOptions for this dept if not present
//         setManagerOptions((prev) => {
//             if (prev[deptId]) return prev;
//             return {
//                 ...prev,
//                 [deptId]: { marketManagers: false, districtManagers: false, selectedMarkets: [], allMarkets: false }
//             };
//         });
//     };

//     const toggleManagerCheck = (deptId, key) => {
//         setManagerOptions((prev) => {
//             const current = prev[deptId] || { marketManagers: false, districtManagers: false, selectedMarkets: [], allMarkets: false };
//             return {
//                 ...prev,
//                 [deptId]: {
//                     ...current,
//                     [key]: !current[key],
//                     // if unchecked markets should be cleared
//                     ...(current[key] && { selectedMarkets: [], allMarkets: false })
//                 }
//             };
//         });
//     };

//     const setDeptSelectedMarkets = (deptId, values) => {
//         setManagerOptions((prev) => {
//             const current = prev[deptId] || { marketManagers: false, districtManagers: false, selectedMarkets: [], allMarkets: false };
//             // if values contains a special token 'ALL_MARKETS' we toggle allMarkets
//             const isAll = values && values.includes("__ALL_MARKETS__");
//             return {
//                 ...prev,
//                 [deptId]: {
//                     ...current,
//                     selectedMarkets: isAll ? marketsFromUsers : values,
//                     allMarkets: isAll
//                 }
//             };
//         });
//     };

//     // Build filter predicate based on selections
//     const buildFilteredUsers = () => {
//         // base filter: exclude gmail and test in name/email (like your original)
//         const baseFiltered = (userData || []).filter((user) => {
//             const email = (user.email || "").toLowerCase();
//             const name = (user.name || "").toLowerCase();
//             if (email.includes("@gmail.com")) return false;
//             if (email.includes("test") || name.includes("test")) return false;
//             return true;
//         });

//         if (filterMode === "all") {
//             return baseFiltered;
//         }

//         // When byDepartment: apply department and market/district manager filters
//         // We'll attempt to match using user.department, user.departmentId, user.market, user.markets
//         const selectedDeptSet = new Set(selectedDepartments.map(String));

//         return baseFiltered.filter((u) => {
//             // If no departments selected, exclude all (safe fallback)
//             if (selectedDeptSet.size === 0) return false;

//             // identify user department id/name
//             const userDept = u.department ?? u.departmentId ?? u.departmentName ?? u.dept ?? "";
//             const userDeptKey = String(userDept);

//             // If user's department matches any selected department -> include (but may need market constraint)
//             const deptMatches = selectedDeptSet.has(userDeptKey) || selectedDeptSet.has(String(u.departmentName ?? "")) || selectedDeptSet.has(String(u.dept ?? ""));

//             if (!deptMatches) {
//                 // user not in selected departments
//                 return false;
//             }

//             // Now check managerOptions for that dept (if any)
//             const mgrOpt = managerOptions[userDeptKey] || managerOptions[userDept] || managerOptions[selectedDepartments.find(sd => String(sd) === String(userDept))];

//             // If no manager options were configured for this dept, include the user (dept-level selection implies all)
//             if (!mgrOpt) return true;

//             // If marketManagers checked, then require user's market to be in selectedMarkets (or allMarkets true)
//             if (mgrOpt.marketManagers) {
//                 // user market field(s)
//                 const uMarkets = [];
//                 if (u.market) {
//                     if (Array.isArray(u.market)) uMarkets.push(...u.market.map(String));
//                     else uMarkets.push(String(u.market));
//                 }
//                 if (u.markets) {
//                     if (Array.isArray(u.markets)) uMarkets.push(...u.markets.map(String));
//                     else uMarkets.push(String(u.markets));
//                 }
//                 // if allMarkets selected -> include
//                 if (mgrOpt.allMarkets) return true;
//                 // else intersection
//                 const allowed = new Set((mgrOpt.selectedMarkets || []).map(String));
//                 const intersects = uMarkets.some((m) => allowed.has(String(m)));
//                 return intersects;
//             }

//             // If districtManagers checked but you want markets under district too — adjust similarly.
//             if (mgrOpt.districtManagers) {
//                 // For now, if districtManagers is checked and no extra market restriction, include all
//                 // You can further extend logic here if district-level also needs market filtering
//                 return true;
//             }

//             // If neither manager checkbox was checked but dept matched -> include
//             return true;
//         });
//     };

//     // Exporting function (builds worksheet and writes file)
//     const handleExport = () => {
//         const filtered = buildFilteredUsers();

//         // Prepare export data
//         const exportData = filtered.map((user) => ({
//             Name: user.name ?? "-",
//             Email: user.email ?? "-",
//             Password: 123456,
//             Phone: user.phone ?? "-",
//             Market: user.market ?? (Array.isArray(user.markets) ? user.markets.join(", ") : user.markets) ?? "-",
//             Department: user.department ?? user.departmentName ?? "-",
//             SubDepartment: user.subDepartment ?? user.sub_department ?? "-"
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(exportData);

//         // Set column widths (wch = width in characters)
//         worksheet["!cols"] = [
//             { wch: 20 }, // Name
//             { wch: 30 }, // Email
//             { wch: 15 }, // Password
//             { wch: 15 }, // Phone
//             { wch: 25 }, // Market
//             { wch: 25 }, // Department
//             { wch: 25 } // SubDepartment
//         ];

//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

//         XLSX.writeFile(workbook, "UsersData.xlsx");

//         setOpen(false);
//     };

//     // Reset filters when modal closes
//     const handleClose = () => {
//         setOpen(false);
//         // optional: reset filter UI states if desired
//         // setFilterMode("all");
//         // setSelectedDepartments([]);
//         // setManagerOptions({});
//     };

//     // UI
//     return (
//         <div>
//             <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
//                 Export Excel
//             </Button>

//             <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//                 <DialogTitle>Export Filters</DialogTitle>
//                 <DialogContent dividers>
//                     <Typography gutterBottom>
//                         Choose how you want to filter users before export.
//                     </Typography>

//                     <Box mt={2}>
//                         <FormControl component="fieldset">
//                             <FormLabel component="legend">Mode</FormLabel>
//                             <RadioGroup
//                                 row
//                                 value={filterMode}
//                                 onChange={(e) => setFilterMode(e.target.value)}
//                             >
//                                 <FormControlLabel value="all" control={<Radio />} label="All" />
//                                 <FormControlLabel
//                                     value="byDepartment"
//                                     control={<Radio />}
//                                     label="By Departments"
//                                 />
//                             </RadioGroup>
//                         </FormControl>
//                     </Box>

//                     <Divider sx={{ my: 2 }} />

//                     {filterMode === "all" && (
//                         <Box>
//                             <Typography>
//                                 "All" selected — export will include all users (after removing Gmail/test entries).
//                             </Typography>
//                             <Typography variant="caption" color="textSecondary">
//                                 (Still excludes `@gmail.com` and any name/email containing "test".)
//                             </Typography>
//                         </Box>
//                     )}

//                     {filterMode === "byDepartment" && (
//                         <Box>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Select Departments
//                             </Typography>

//                             {loadingDepartments ? (
//                                 <Box display="flex" alignItems="center" gap={1}>
//                                     <CircularProgress size={20} />
//                                     <Typography>Loading departments...</Typography>
//                                 </Box>
//                             ) : (
//                                 <>
//                                     <List dense>
//                                         {(departments.length === 0) && (
//                                             <ListItem>
//                                                 <ListItemText primary="No departments found." />
//                                             </ListItem>
//                                         )}
//                                         {departments.map((dept) => {
//                                             const deptKey = String(dept.id);
//                                             const selected = selectedDepartments.includes(deptKey);
//                                             const opts = managerOptions[deptKey] || {};
//                                             return (
//                                                 <React.Fragment key={deptKey}>
//                                                     <ListItem>
//                                                         <FormControlLabel
//                                                             control={
//                                                                 <Checkbox
//                                                                     checked={selected}
//                                                                     onChange={() => toggleDepartment(deptKey)}
//                                                                 />
//                                                             }
//                                                             label={<ListItemText primary={dept.name} />}
//                                                         />
//                                                         <ListItemSecondaryAction>
//                                                             {/* Manager checkboxes only shown when dept selected */}
//                                                             {selected && (
//                                                                 <Box display="flex" gap={1} alignItems="center">
//                                                                     <FormControlLabel
//                                                                         control={
//                                                                             <Checkbox
//                                                                                 checked={!!opts.marketManagers}
//                                                                                 onChange={() => toggleManagerCheck(deptKey, "marketManagers")}
//                                                                             />
//                                                                         }
//                                                                         label="Market Managers"
//                                                                     />
//                                                                     <FormControlLabel
//                                                                         control={
//                                                                             <Checkbox
//                                                                                 checked={!!opts.districtManagers}
//                                                                                 onChange={() => toggleManagerCheck(deptKey, "districtManagers")}
//                                                                             />
//                                                                         }
//                                                                         label="District Managers"
//                                                                     />
//                                                                 </Box>
//                                                             )}
//                                                         </ListItemSecondaryAction>
//                                                     </ListItem>

//                                                     {/* If marketManagers checked, show markets multiselect */}
//                                                     {selected && opts && opts.marketManagers && (
//                                                         <Box px={4} py={1}>
//                                                             <Typography variant="caption">Select Markets (or choose All)</Typography>
//                                                             <Autocomplete
//                                                                 multiple
//                                                                 freeSolo={false}
//                                                                 options={["__ALL_MARKETS__", ...marketsFromUsers]}
//                                                                 value={opts.allMarkets ? ["__ALL_MARKETS__"] : (opts.selectedMarkets || [])}
//                                                                 onChange={(e, value) => {
//                                                                     // if user selected special token "__ALL_MARKETS__" treat as all
//                                                                     if (value && value.includes("__ALL_MARKETS__")) {
//                                                                         setDeptSelectedMarkets(deptKey, ["__ALL_MARKETS__"]);
//                                                                     } else {
//                                                                         setDeptSelectedMarkets(deptKey, value);
//                                                                     }
//                                                                 }}
//                                                                 renderTags={(value, getTagProps) =>
//                                                                     value.map((option, index) => {
//                                                                         const label = option === "__ALL_MARKETS__" ? "All Markets" : option;
//                                                                         return <Chip key={option} label={label} {...getTagProps({ index })} />;
//                                                                     })
//                                                                 }
//                                                                 renderInput={(params) => (
//                                                                     <TextField
//                                                                         {...params}
//                                                                         placeholder="Choose markets (type to search)"
//                                                                     />
//                                                                 )}
//                                                                 sx={{ mt: 1, width: 500 }}
//                                                             />
//                                                             <Typography variant="caption" color="textSecondary" display="block" mt={0.5}>
//                                                                 Tip: Choose "All Markets" option to include all markets for this department.
//                                                             </Typography>
//                                                         </Box>
//                                                     )}

//                                                     <Divider />
//                                                 </React.Fragment>
//                                             );
//                                         })}
//                                     </List>
//                                 </>
//                             )}
//                         </Box>
//                     )}
//                 </DialogContent>

//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button
//                         variant="contained"
//                         onClick={handleExport}
//                         disabled={filterMode === "byDepartment" && selectedDepartments.length === 0}
//                     >
//                         Apply & Export
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }

// export default ExportUsersWithFilters;


import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Autocomplete,
  TextField,
  Chip,
  CircularProgress
} from "@mui/material";
import * as XLSX from "xlsx";
import { getAllDepartmentsServices } from "../Services/departments.services";

// import { getAllDepartmentsServices } from "path/to/service";

function ExportUsersWithFilters({ userData }) {
  const [open, setOpen] = useState(false);
  const [filterMode, setFilterMode] = useState("all");
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // ✅ Global Manager selections
  const [marketManagers, setMarketManagers] = useState(false);
  const [districtManagers, setDistrictManagers] = useState(false);
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [allMarkets, setAllMarkets] = useState(false);

  // Extract markets from userData
  const marketsFromUsers = useMemo(() => {
    const setMarkets = new Set();
    (userData || []).forEach((u) => {
      const m = u.market || u.markets || u.marketName;
      if (Array.isArray(m)) m.forEach((x) => x && setMarkets.add(String(x)));
      else if (m) setMarkets.add(String(m));
    });
    return Array.from(setMarkets).sort();
  }, [userData]);

  // Fetch departments once
  useEffect(() => {
    if (!open || departments.length > 0) return;
    if (filterMode === "byDepartment") {
      setLoadingDepartments(true);
      (async () => {
        try {
          const res = await getAllDepartmentsServices();
          const data = res?.data?.data || [];
          const clean = data.map((d, i) => ({
            id: d.id || d._id || i,
            name: d.name || d.departmentName || `Dept ${i + 1}`,
          }));
          setDepartments(clean);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingDepartments(false);
        }
      })();
    }
  }, [open, filterMode]);

  const toggleDepartment = (id) => {
    setSelectedDepartments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const buildFilteredUsers = () => {
    // base filter
    const baseFiltered = userData.filter((user) => {
      const email = user.email?.toLowerCase() || "";
      const name = user.name?.toLowerCase() || "";
      if (email.includes("@gmail.com")) return false;
      if (email.includes("test") || name.includes("test")) return false;
      return true;
    });

    if (filterMode === "all") return baseFiltered;

    // by department filtering
    const selectedDeptSet = new Set(selectedDepartments.map(String));

    return baseFiltered.filter((u) => {
      const dept =
        u.department || u.departmentName || u.departmentId || u.dept || "";
      const marketList = Array.isArray(u.market)
        ? u.market
        : u.market
        ? [u.market]
        : Array.isArray(u.markets)
        ? u.markets
        : u.markets
        ? [u.markets]
        : [];

      // include only selected departments
      const deptMatch = selectedDeptSet.has(String(dept));
      if (!deptMatch) return false;

      // if Market Managers selected, filter by markets
      if (marketManagers) {
        if (allMarkets) return true;
        if (selectedMarkets.length === 0) return false;
        return marketList.some((m) => selectedMarkets.includes(String(m)));
      }

      // if District Managers selected, include all users of those depts
      if (districtManagers) return true;

      return true;
    });
  };

  const handleExport = () => {
    const filtered = buildFilteredUsers();

    const exportData = filtered.map((u) => ({
      Name: u.name || "-",
      Email: u.email || "-",
      Password: 123456,
      Phone: u.phone || "-",
      Market:
        u.market ||
        (Array.isArray(u.markets) ? u.markets.join(", ") : u.markets) ||
        "-",
      Department: u.department || u.departmentName || "-",
      SubDepartment: u.subDepartment || "-",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    ws["!cols"] = [
      { wch: 20 },
      { wch: 30 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "UsersData.xlsx");

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDepartments([]);
    setMarketManagers(false);
    setDistrictManagers(false);
    setSelectedMarkets([]);
    setAllMarkets(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Export Excel
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Export Filters</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Choose how you want to filter users before export.
          </Typography>

          {/* Filter Mode */}
          <Box mt={2}>
            <FormControl>
              <FormLabel>Mode</FormLabel>
              <RadioGroup
                row
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                  value="byDepartment"
                  control={<Radio />}
                  label="By Departments"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2 }} />

          {filterMode === "all" && (
            <Typography>
              “All” selected — all users (excluding Gmail/Test) will be exported.
            </Typography>
          )}

          {filterMode === "byDepartment" && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Select Departments
              </Typography>

              {loadingDepartments ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={20} />
                  <Typography>Loading departments...</Typography>
                </Box>
              ) : (
                <List dense>
                  {departments.map((d) => (
                    <ListItem key={d.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDepartments.includes(d.id)}
                            onChange={() => toggleDepartment(d.id)}
                          />
                        }
                        label={d.name}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              {/* Global manager selection */}
              {selectedDepartments.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">Manager Type</Typography>
                  <Box display="flex" gap={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={marketManagers}
                          onChange={(e) => setMarketManagers(e.target.checked)}
                        />
                      }
                      label="Market Managers"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={districtManagers}
                          onChange={(e) =>
                            setDistrictManagers(e.target.checked)
                          }
                        />
                      }
                      label="District Managers"
                    />
                  </Box>

                  {/* Market selection when Market Managers checked */}
                  {selectedDepartments==="Market Managers" && (
                    <Box mt={2}>
                      <Typography variant="subtitle2" gutterBottom>
                        Select Markets
                      </Typography>
                      <Autocomplete
                        multiple
                        options={["All Markets", ...marketsFromUsers]}
                        value={
                          allMarkets
                            ? ["All Markets"]
                            : selectedMarkets.map((m) => String(m))
                        }
                        onChange={(e, value) => {
                          if (value.includes("All Markets")) {
                            setAllMarkets(true);
                            setSelectedMarkets([]);
                          } else {
                            setAllMarkets(false);
                            setSelectedMarkets(value);
                          }
                        }}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              key={option}
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Choose markets..."
                          />
                        )}
                        sx={{ width: 500 }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleExport}
            disabled={
              filterMode === "byDepartment" && selectedDepartments.length === 0
            }
          >
            Apply & Export
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExportUsersWithFilters;
