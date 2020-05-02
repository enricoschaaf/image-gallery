export const Search = ({ searchRef, setInput }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        setInput(e.target[0].value)
        history.replaceState(
          { path: `${location.origin}/${e.target[0].value}` },
          "",
          `${location.origin}/${e.target[0].value.toLowerCase()}`
        )
        e.target[0].value = ""
        e.target[0].blur()
      }}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          ref={searchRef}
          id="search"
          spellCheck="false"
          autoComplete="off"
          className="form-input block w-full pl-10 sm:text-sm sm:leading-5"
          placeholder="Search (Press / to focus)"
        />
      </div>
    </form>
  )
}
