const LandingPageHero = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center lg:pt-20">
            <div className="space-y-4">
                <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl underline underline-offset-8 decoration-8 decoration-red-500">
                    Welcome to
                </h1>
                <h1 className="mx-auto max-w-5xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">Digital Education Environment</h1>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-xl tracking-tight text-slate-700">Now visualise your data, focus and learn more effectively.</p>
            <div className="mt-10 flex justify-center gap-x-6">

                <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">Get 6 months free</button>

                <a className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <svg aria-hidden="true" className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current">
                        <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z"></path>
                    </svg>
                    <span className="ml-3">Watch video</span>
                </a>
            </div>
            <div className="mt-36 lg:mt-44">
                <p className="font-medium text-xl text-slate-700">Trusted by these institutes so far</p>
                <ul role="list" className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
                    <li>
                        <ul role="list" className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
                            <li className="flex">
                                <img alt="Transistor" src="https://salient.tailwindui.com/_next/static/media/transistor.7274e6c3.svg" width="158" height="48" decoding="async" data-nimg="future" loading="lazy" style={{ color: "transparent" }} />
                            </li>
                            <li className="flex">
                                <img alt="Tuple" src="https://salient.tailwindui.com/_next/static/media/tuple.74eb0ae0.svg" width="105" height="48" decoding="async" data-nimg="future" loading="lazy" style={{ color: "transparent" }} />
                            </li>
                            <li className="flex">
                                <img alt="StaticKit" src="https://salient.tailwindui.com/_next/static/media/statickit.d7937794.svg" width="127" height="48" decoding="async" data-nimg="future" loading="lazy" style={{ color: "transparent" }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul role="list" className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
                            <li className="flex">
                                <img alt="Mirage" src="https://salient.tailwindui.com/_next/static/media/mirage.18d2ec4e.svg" width="138" height="48" decoding="async" data-nimg="future" loading="lazy" style={{ color: "transparent" }} />
                            </li>
                            <li className="flex">
                                <img alt="Laravel" src="https://salient.tailwindui.com/_next/static/media/laravel.7deed17e.svg" width="136" height="48" decoding="async" data-nimg="future" loading="lazy" style={{ color: "transparent" }} />
                            </li>
                            <li className="flex">
                                <img alt="Statamic" src="https://salient.tailwindui.com/_next/static/media/statamic.6da5ebfb.svg" width="147" height="48" decoding="async" data-nimg="future" loading="lazy" style={{ color: "transparent" }} />
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LandingPageHero