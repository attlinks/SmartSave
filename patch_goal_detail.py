from pathlib import Path

path = Path('src/pages/Dashboard/GoalDetail.jsx')
text = path.read_text(encoding='utf-8')
text = text.replace(
    'import { useEffect, useState } from "react";\nimport { useNavigate, useParams } from "react-router-dom";\nimport { FiLock, FiMinus, FiPlus, FiUnlock } from "react-icons/fi";\nimport { getGoalById, computeGoalProgress, formatCurrency, updateStoredGoal } from "../../utils/goalHelpers";\nimport { sendGoalTransactionEmail } from "../../utils/notifications";\nimport { useAuth } from "../../context/AuthContext";\n',
    'import { useEffect, useState } from "react";\nimport { useNavigate, useParams } from "react-router-dom";\nimport { FiLock, FiMinus, FiPlus, FiUnlock } from "react-icons/fi";\nimport { getGoalById, computeGoalProgress, formatCurrency } from "../../utils/goalHelpers";\nimport { updateStoredGoal } from "../../utils/goalsStorage";\nimport { sendGoalTransactionEmail } from "../../utils/notifications";\nimport { useAuth } from "../../context/AuthContext";\n',
    1,
)
text = text.replace(
    '    const updated = computeGoalProgress({ ...goal, ...values });\n    updateStoredGoal(updated);\n    setGoal(updated);\n',
    '    const updated = computeGoalProgress({ ...goal, ...values });\n    await updateStoredGoal(updated, user?.uid);\n    setGoal(updated);\n',
    1,
)
text = text.replace(
    '    const nextLocked = !locked;\n    setLocked(nextLocked);\n    const updated = { ...goal, locked: nextLocked };\n    updateStoredGoal(updated);\n    setGoal(updated);\n',
    '    const nextLocked = !locked;\n    setLocked(nextLocked);\n    const updated = { ...goal, locked: nextLocked };\n    await updateStoredGoal(updated, user?.uid);\n    setGoal(updated);\n',
    1,
)
path.write_text(text, encoding='utf-8')
print('patched goal detail')
