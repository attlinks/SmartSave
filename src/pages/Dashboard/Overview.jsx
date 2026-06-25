// const stats = [
//   { label: "Revenue", value: "$48,295", change: "+12%", up: true, emoji: "💰" },
//   { label: "Projects", value: "24", change: "+3 new", up: true, emoji: "🗂️" },
//   {
//     label: "Team",
//     value: "8 people",
//     change: "All active",
//     up: true,
//     emoji: "🧑‍🤝‍🧑",
//   },
//   {
//     label: "Tasks done",
//     value: "142",
//     change: "+18% this week",
//     up: true,
//     emoji: "✅",
//   },
// ];

// const activity = [
//   {
//     user: "Alice",
//     action: "finished",
//     item: "Homepage redesign",
//     time: "2 min ago",
//     emoji: "🎉",
//   },
//   {
//     user: "Bob",
//     action: "kicked off",
//     item: "Q3 Campaign",
//     time: "1 hr ago",
//     emoji: "🚀",
//   },
//   {
//     user: "You",
//     action: "updated",
//     item: "Notifications settings",
//     time: "3 hr ago",
//     emoji: "🔔",
//   },
//   {
//     user: "Carol",
//     action: "left a note on",
//     item: "API Integration",
//     time: "5 hr ago",
//     emoji: "💬",
//   },
// ];

// const avatarColors = [
//   "bg-orange-200 text-orange-700",
//   "bg-rose-200 text-rose-700",
//   "bg-amber-200 text-amber-700",
//   "bg-teal-200 text-teal-700",
// ];

// export default function Overview() {
//   return (
//     <div className="space-y-7">
//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((s) => (
//           <div
//             key={s.label}
//             className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
//           >
//             <div className="text-2xl mb-2">{s.emoji}</div>
//             <p className="text-stone-400 text-xs font-medium mb-0.5">
//               {s.label}
//             </p>
//             <p className="text-stone-900 text-xl font-bold leading-tight">
//               {s.value}
//             </p>
//             <span
//               className={`text-xs font-medium mt-1 inline-block ${s.up ? "text-emerald-500" : "text-rose-400"}`}
//             >
//               {s.change}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//         {/* Chart */}
//         <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <h2 className="text-stone-800 font-bold text-base">
//                 Revenue this year
//               </h2>
//               <p className="text-stone-400 text-xs mt-0.5">Looking good 🌱</p>
//             </div>
//             <span className="text-emerald-500 bg-emerald-50 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">
//               +24% YoY
//             </span>
//           </div>
//           <div className="flex items-end gap-1.5 h-32">
//             {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h) => (
//               <div key={h} className="flex-1 flex flex-col items-center gap-1">
//                 <div
//                   className="w-full rounded-t-lg transition-all"
//                   style={{
//                     height: `${h}%`,
//                     background:
//                       h === 100 ? "#fb923c" : h >= 80 ? "#fdba74" : "#fed7aa",
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between mt-2">
//             {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map(
//               (m) => (
//                 <span
//                   key={m}
//                   className="text-stone-300 text-xs flex-1 text-center"
//                 >
//                   {m}
//                 </span>
//               ),
//             )}
//           </div>
//         </div>

//         {/* Activity */}
//         <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
//           <h2 className="text-stone-800 font-bold text-base mb-5">
//             What's happening
//           </h2>
//           <ul className="space-y-4">
//             {activity.map((a, i) => (
//               <li key={i} className="flex items-start gap-3">
//                 <div
//                   className={`w-8 h-8 rounded-full ${avatarColors[i]} text-xs flex items-center justify-center font-bold shrink-0`}
//                 >
//                   {a.user[0]}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-stone-700 text-sm leading-snug">
//                     <span className="font-semibold">{a.user}</span> {a.action}{" "}
//                     <span className="text-orange-500 font-medium">
//                       {a.item}
//                     </span>{" "}
//                     {a.emoji}
//                   </p>
//                   <p className="text-stone-300 text-xs mt-0.5">{a.time}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Quick note */}
//       <div className="bg-amber-50 border border-amber-100 rounded-3xl p-5 flex items-center gap-4">
//         <span className="text-2xl">💡</span>
//         <div>
//           <p className="text-stone-700 text-sm font-semibold">
//             You have 3 tasks due this week
//           </p>
//           <p className="text-stone-400 text-xs mt-0.5">
//             Head over to Projects to check them off.
//           </p>
//         </div>
//         <button className="ml-auto text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors whitespace-nowrap">
//           View tasks →
//         </button>
//       </div>
//     </div>
//   );
// }
