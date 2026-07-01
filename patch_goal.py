from pathlib import Path

creategoal = Path('src/pages/Dashboard/Creategoal.jsx')
text = creategoal.read_text(encoding='utf-8')
text = text.replace(
    'import { FiArrowLeft, FiCalendar, FiDollarSign } from "react-icons/fi";\nimport { Link, useNavigate } from "react-router-dom";\nimport { saveGoal } from "../../utils/goalsStorage";\n',
    'import { FiArrowLeft, FiCalendar, FiDollarSign } from "react-icons/fi";\nimport { Link, useNavigate } from "react-router-dom";\nimport { useAuth } from "../../context/AuthContext";\nimport { saveGoal } from "../../utils/goalsStorage";\n',
    1,
)
text = text.replace(
    'const Creategoal = () => {\n  const navigate = useNavigate();\n\n  const handleSubmit = (event) => {\n',
    'const Creategoal = () => {\n  const navigate = useNavigate();\n  const { user } = useAuth();\n\n  const handleSubmit = (event) => {\n',
    1,
)
text = text.replace(
    '    const formData = new FormData(event.currentTarget);\n    saveGoal({\n      goalName: formData.get("goalName"),\n      targetAmount: formData.get("targetAmount"),\n      deadline: formData.get("deadline"),\n      category: formData.get("category"),\n      note: formData.get("note"),\n    });\n\n    navigate("/dashboard/goals");\n',
    '    const formData = new FormData(event.currentTarget);\n    saveGoal(\n      {\n        goalName: formData.get("goalName"),\n        targetAmount: formData.get("targetAmount"),\n        deadline: formData.get("deadline"),\n        category: formData.get("category"),\n        note: formData.get("note"),\n      },\n      user?.uid,\n    );\n\n    navigate("/dashboard/goals");\n',
    1,
)
creategoal.write_text(text, encoding='utf-8')
print('patched creategoal')
