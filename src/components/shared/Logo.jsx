import { Link } from "react-router-dom"

export const Logo = ({isDashboard}) => {
  return (
    <Link to='/' className={`text-2xl font-bold tracking-tighter transition-all ${isDashboard && 'hover:scale-105'}`}>
        <p className="hidden lg:block">
            Master
            <span className="text-cyan-600">Cell</span>
        </p>

        <p className="flez text-4xl lg:hidden">
            <span className="-skew-x-6">M</span>
            <span className="text-cyan-600 skew-x-6">C</span>
        </p>
    </Link>
  )
}