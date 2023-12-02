import LogoutPopover from "./global/LogoutPopover"
import SignInPopover from "./SignInPopover"

const LandingPageHeader = ({ currentUser }) => {

    return (
        <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav className="relative z-50 flex justify-between">
                    <div className="flex items-center md:gap-x-12">
                        <button className="w-32 sm:w-36">
                            <img src="/FullLogo.svg" alt="Dlogo" />
                        </button>
                    </div>
                    <div className="flex items-center mt-1">
                        {currentUser === null ?
                            <SignInPopover /> : (
                                <div className="flex space-x-2 items-start">
                                    <div>
                                        <div className="flex justify-center items-center space-x-2 font-medium px-2">
                                            <p className="text-gray-800">{currentUser.fullName}</p>
                                            <p className="text-red-600 border -mt-3 px-2 rounded-lg text-sm">{currentUser.role}</p>
                                        </div>
                                        <a href="/notices/generalnotices">
                                            <button
                                                className="w-full rounded-full py-1 text-sm font-semibold bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 outline-none">
                                                Go to console
                                            </button>
                                        </a>
                                    </div>
                                    <LogoutPopover />
                                </div>
                            )
                        }
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default LandingPageHeader