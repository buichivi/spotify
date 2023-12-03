const SpotifyLogo = ({ width, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            role="img"
            viewBox="0 0 78 24"
            aria-label="Spotify"
            aria-hidden="false"
            fill="currentColor"
            data-encore-id="logoSpotify"
            className={`Svg-sc-6c3c1v-0 dDJltW ${className}`}
        >
            <title>Spotify</title>
            <path d="M31.8234 11.0782C29.8042 10.5836 29.4444 10.2376 29.4444 9.50832C29.4444 8.8202 30.077 8.35677 31.0159 8.35677C31.9262 8.35677 32.8296 8.70885 33.7765 9.43308C33.8051 9.45515 33.8407 9.46318 33.8763 9.45816C33.8937 9.45541 33.9104 9.4491 33.9253 9.43962C33.9403 9.43013 33.9532 9.41767 33.9633 9.40299L34.9496 7.97659C34.9691 7.9483 34.9774 7.91361 34.9728 7.87941C34.9682 7.84522 34.9511 7.81402 34.9249 7.79203C33.7982 6.86416 32.5291 6.41378 31.0456 6.41378C28.8653 6.41378 27.3422 7.75591 27.3422 9.67684C27.3422 11.7372 28.6567 12.4654 30.927 13.0292C32.8592 13.4856 33.1854 13.8688 33.1854 14.5529C33.1854 15.3102 32.5262 15.7817 31.4647 15.7817C30.2855 15.7817 29.3239 15.3744 28.2485 14.4185C28.2354 14.4066 28.22 14.3975 28.2033 14.3918C28.1866 14.3861 28.169 14.3839 28.1515 14.3853C28.1339 14.3867 28.1168 14.3917 28.1012 14.4C28.0856 14.4083 28.0719 14.4197 28.0607 14.4335L26.9547 15.7837C26.9322 15.8106 26.921 15.8454 26.9234 15.8806C26.9258 15.9158 26.9416 15.9487 26.9676 15.9722C28.2199 17.1188 29.7587 17.7236 31.4192 17.7236C33.7695 17.7236 35.2877 16.4066 35.2877 14.3683C35.2877 12.645 34.2845 11.6921 31.8234 11.0782ZM42.31 13.3873C42.31 14.8418 41.4363 15.8579 40.185 15.8579C38.9496 15.8579 38.0165 14.7966 38.0165 13.3873C38.0165 11.9789 38.9486 10.9177 40.186 10.9177C41.4165 10.9177 42.31 11.9559 42.31 13.3873ZM40.6041 9.03385C39.5861 9.03385 38.7499 9.44613 38.061 10.2897V9.3408C38.0613 9.30506 38.0476 9.27066 38.023 9.2451C37.9984 9.21955 37.9648 9.20491 37.9296 9.20438H36.1209C36.1033 9.20451 36.086 9.20814 36.0699 9.21507C36.0537 9.222 36.0391 9.23208 36.0268 9.24475C36.0145 9.25742 36.0048 9.27242 35.9982 9.2889C35.9916 9.30538 35.9883 9.32302 35.9884 9.3408V19.8873C35.9884 19.9626 36.0477 20.0237 36.1209 20.0237H37.9296C37.9648 20.0232 37.9984 20.0086 38.023 19.983C38.0476 19.9575 38.0613 19.9231 38.061 19.8873V16.5581C38.7509 17.3515 39.5861 17.7387 40.6041 17.7387C42.4968 17.7387 44.4123 16.2441 44.4123 13.3873C44.4123 10.5295 42.4968 9.03385 40.6041 9.03385ZM49.3235 15.8729C48.0267 15.8729 47.0502 14.8046 47.0502 13.3873C47.0502 11.9649 47.9931 10.9317 49.2938 10.9317C50.5985 10.9317 51.5819 12.001 51.5819 13.4194C51.5819 14.8408 50.6331 15.8729 49.3235 15.8729ZM49.3235 9.03486C46.8862 9.03486 44.9766 10.9608 44.9766 13.4184C44.9766 15.8499 46.8733 17.7557 49.2938 17.7557C51.739 17.7557 53.6545 15.8368 53.6545 13.3873C53.6545 10.9468 51.7529 9.03385 49.3235 9.03385V9.03486ZM58.8592 9.20438H56.8697V7.11795C56.8699 7.10013 56.8667 7.08243 56.8601 7.06589C56.8536 7.04935 56.8439 7.0343 56.8316 7.0216C56.8192 7.00891 56.8046 6.99883 56.7884 6.99195C56.7722 6.98507 56.7548 6.98152 56.7372 6.98153H54.9285C54.8935 6.98205 54.86 6.99655 54.8354 7.02189C54.8108 7.04723 54.797 7.08137 54.797 7.11694V9.20438H53.9273C53.9098 9.20451 53.8925 9.20815 53.8764 9.21509C53.8604 9.22203 53.8458 9.23213 53.8336 9.24481C53.8213 9.25749 53.8117 9.2725 53.8052 9.28898C53.7988 9.30545 53.7956 9.32306 53.7958 9.3408V10.9357C53.7958 11.0099 53.8551 11.0711 53.9273 11.0711H54.797V15.1969C54.797 16.864 55.6055 17.7096 57.2008 17.7096C57.8491 17.7096 58.3868 17.5722 58.8948 17.2763C58.9152 17.2644 58.9322 17.2474 58.944 17.2268C58.9558 17.2061 58.962 17.1827 58.962 17.1589V15.6402C58.962 15.6171 58.9561 15.5944 58.9451 15.5743C58.934 15.5541 58.9181 15.5371 58.8988 15.5249C58.8797 15.5128 58.8578 15.5059 58.8353 15.5048C58.8128 15.5038 58.7904 15.5086 58.7703 15.5188C58.4214 15.6994 58.0853 15.7817 57.7088 15.7817C57.1286 15.7817 56.8687 15.5108 56.8687 14.906V11.0701H58.8592C58.8768 11.07 58.8941 11.0664 58.9102 11.0594C58.9264 11.0525 58.941 11.0424 58.9533 11.0298C58.9656 11.0171 58.9753 11.0021 58.9819 10.9856C58.9885 10.9691 58.9918 10.9515 58.9917 10.9337V9.33879C58.9918 9.32106 58.9885 9.30347 58.9819 9.28705C58.9753 9.27062 58.9655 9.25569 58.9532 9.2431C58.9409 9.23051 58.9263 9.22052 58.9101 9.2137C58.894 9.20689 58.8767 9.20338 58.8592 9.20338V9.20438ZM65.7926 9.21241V8.95662C65.7926 8.20229 66.0743 7.86525 66.7069 7.86525C67.0834 7.86525 67.3869 7.94249 67.7259 8.05885C67.7458 8.06532 67.7669 8.06688 67.7876 8.06339C67.8082 8.0599 67.8277 8.05146 67.8445 8.03879C67.8617 8.02619 67.8757 8.0096 67.8853 7.99041C67.8949 7.97122 67.8999 7.94998 67.8998 7.92845V6.36563C67.9001 6.33654 67.891 6.30815 67.8741 6.28466C67.8572 6.26118 67.8333 6.24384 67.8059 6.23523C67.3194 6.08322 66.8126 6.00877 66.3036 6.01455C64.6333 6.01455 63.7497 6.97952 63.7497 8.80314V9.19635H62.8809C62.8457 9.19662 62.812 9.211 62.7872 9.23637C62.7624 9.26174 62.7485 9.29603 62.7485 9.33177V10.9347C62.7485 11.0099 62.8078 11.0711 62.8809 11.0711H63.7507V17.4348C63.7507 17.51 63.809 17.5702 63.8821 17.5702H65.6908C65.763 17.5702 65.8223 17.51 65.8223 17.4348V11.0701H67.5114L70.098 17.4317C69.8044 18.1008 69.5148 18.2342 69.1214 18.2342C68.8022 18.2342 68.4671 18.1359 68.1232 17.9433C68.1073 17.9346 68.0898 17.9292 68.0718 17.9275C68.0538 17.9257 68.0357 17.9277 68.0184 17.9333C68.0012 17.9395 67.9854 17.9491 67.9719 17.9617C67.9585 17.9743 67.9478 17.9896 67.9403 18.0065L67.3276 19.3858C67.3133 19.4168 67.3112 19.4522 67.3217 19.4848C67.3321 19.5174 67.3544 19.5447 67.3839 19.5613C67.9715 19.9033 68.6389 20.0787 69.3162 20.0689C70.6504 20.0689 71.3888 19.4309 72.0401 17.7136L75.1772 9.39697C75.1851 9.37633 75.1879 9.35406 75.1855 9.33206C75.1831 9.31005 75.1755 9.28896 75.1633 9.27058C75.1514 9.25244 75.1352 9.23756 75.1162 9.22724C75.0973 9.21693 75.0761 9.21149 75.0546 9.2114H73.1718C73.1441 9.21153 73.1172 9.22039 73.0947 9.23674C73.0722 9.25309 73.0553 9.27614 73.0462 9.30268L71.1179 14.9541L69.0058 9.29867C68.9965 9.27304 68.9797 9.25092 68.9576 9.23531C68.9355 9.21971 68.9092 9.21136 68.8823 9.2114H65.7926V9.21241ZM61.7729 9.20438H59.9642C59.929 9.20491 59.8954 9.21955 59.8708 9.2451C59.8462 9.27066 59.8325 9.30506 59.8328 9.3408V17.4348C59.8328 17.51 59.8921 17.5702 59.9652 17.5702H61.7739C61.8461 17.5702 61.9054 17.51 61.9054 17.4348V9.3398C61.9054 9.30406 61.8915 9.26976 61.8666 9.2444C61.8418 9.21903 61.8082 9.20464 61.7729 9.20438ZM60.8775 5.51902C60.5318 5.52114 60.2011 5.6624 59.958 5.91179C59.7148 6.16117 59.5792 6.49829 59.5807 6.84912C59.5798 7.023 59.6127 7.19536 59.6774 7.35636C59.7421 7.51736 59.8375 7.66384 59.958 7.78745C60.0785 7.91105 60.2218 8.00936 60.3797 8.07675C60.5377 8.14414 60.7071 8.1793 60.8785 8.18022C61.2243 8.1781 61.5552 8.0367 61.7983 7.7871C62.0415 7.53749 62.177 7.20012 62.1752 6.84912C62.1752 6.11385 61.5931 5.51902 60.8775 5.51902ZM76.7951 10.0099H76.464V10.4432H76.7951C76.9602 10.4432 77.059 10.3599 77.059 10.2265C77.059 10.0851 76.9602 10.0099 76.7951 10.0099ZM77.0096 10.6278L77.3704 11.1454H77.0659L76.7427 10.6709H76.464V11.1454H76.21V9.77414H76.805C77.1154 9.77414 77.3199 9.93764 77.3199 10.2115C77.3243 10.3067 77.2956 10.4005 77.2389 10.4765C77.1822 10.5526 77.1011 10.6061 77.0096 10.6278ZM76.7279 9.31873C76.0756 9.31873 75.5824 9.85037 75.5824 10.5014C75.5824 11.1514 76.0726 11.676 76.721 11.676C77.3733 11.676 77.8675 11.1444 77.8675 10.4934C77.8675 9.84335 77.3763 9.31873 76.7279 9.31873ZM76.721 11.8064C76.5529 11.806 76.3865 11.7719 76.2315 11.706C76.0764 11.6401 75.9357 11.5437 75.8175 11.4224C75.6993 11.3012 75.6058 11.1573 75.5426 10.9993C75.4794 10.8412 75.4475 10.672 75.449 10.5014C75.449 9.78517 76.0123 9.18833 76.7279 9.18833C76.896 9.18872 77.0624 9.22285 77.2174 9.28874C77.3725 9.35464 77.5132 9.451 77.6314 9.57229C77.7496 9.69358 77.8431 9.8374 77.9063 9.99547C77.9696 10.1535 78.0014 10.3228 77.9999 10.4934C77.9999 11.2096 77.4366 11.8074 76.721 11.8074V11.8064Z M19.0985 10.6382C15.2302 8.34115 8.85004 8.13001 5.15734 9.25061C4.56443 9.4307 3.93745 9.09586 3.75774 8.50285C3.57803 7.90967 3.91237 7.283 4.50579 7.10274C8.74454 5.81575 15.7911 6.06437 20.244 8.70775C20.7776 9.02438 20.9524 9.71333 20.6363 10.2458C20.3199 10.7793 19.6303 10.9549 19.0985 10.6382ZM17.6847 14.3488C14.4602 12.3664 9.54258 11.7923 5.72724 12.9502C5.23257 13.0996 4.71006 12.8208 4.55976 12.327C4.41084 11.8322 4.68965 11.3109 5.1838 11.1605C9.54206 9.83755 14.9602 10.4784 18.6638 12.7544C19.1038 13.0254 19.2424 13.6014 18.9717 14.0407C18.7003 14.481 18.1247 14.6191 17.6847 14.3488ZM16.475 17.5571C13.657 15.8349 10.1104 15.446 5.93306 16.4002C5.53058 16.4923 5.12966 16.2401 5.03782 15.8377C4.94546 15.4352 5.19677 15.0339 5.60011 14.9421C10.1715 13.8972 14.0923 14.3469 17.2554 16.2796C17.6079 16.4949 17.7191 16.9557 17.5034 17.3084C17.2879 17.6619 16.8275 17.7727 16.475 17.5571ZM0 11.9998C0 18.6277 5.37285 24 12 24C18.6277 24 24 18.6277 24 11.9998C24 5.37264 18.6277 0 12 0C5.37285 0 0 5.37264 0 11.9998Z"></path>
        </svg>
    );
};

const HomeIcon = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            data-encore-id="icon"
            fill="currentColor"
            role="img"
            aria-hidden="true"
            className={`Svg-sc-ytk21e-0 iYxpxA home-icon ${className}`}
            viewBox="0 0 24 24"
        >
            <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
        </svg>
    );
};

const HomeIconActived = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            className={`Svg-sc-ytk21e-0 iYxpxA home-active-icon ${className}`}
            viewBox="0 0 24 24"
        >
            <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
        </svg>
    );
};

const SearchIcon = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            className={`Svg-sc-ytk21e-0 iYxpxA search-icon ${className}`}
            viewBox="0 0 24 24"
        >
            <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
        </svg>
    );
};

const SearchIconActived = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            className={`Svg-sc-ytk21e-0 iYxpxA search-active-icon ${className}`}
            viewBox="0 0 24 24"
        >
            <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path>
            <path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path>
        </svg>
    );
};

const LibraryIcon = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`Svg-sc-ytk21e-0 iYxpxA ${className}`}
        >
            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
        </svg>
    );
};

const PlusIcon = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={`Svg-sc-ytk21e-0 kPpCsU ${className}`}
        >
            <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path>
        </svg>
    );
};

const LanguageIcon = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={`Svg-sc-ytk21e-0 kPpCsU ${className}`}
        >
            <path d="M8.152 16H8a8 8 0 1 1 .152 0zm-.41-14.202c-.226.273-.463.713-.677 1.323-.369 1.055-.626 2.496-.687 4.129h3.547c-.06-1.633-.318-3.074-.687-4.129-.213-.61-.45-1.05-.676-1.323-.194-.235-.326-.285-.385-.296h-.044c-.055.007-.19.052-.391.296zM4.877 7.25c.062-1.771.34-3.386.773-4.624.099-.284.208-.554.329-.806a6.507 6.507 0 0 0-4.436 5.43h3.334zm-3.334 1.5a6.507 6.507 0 0 0 4.436 5.43 7.974 7.974 0 0 1-.33-.806c-.433-1.238-.71-2.853-.772-4.624H1.543zm4.835 0c.061 1.633.318 3.074.687 4.129.214.61.451 1.05.677 1.323.202.244.336.29.391.297l.044-.001c.06-.01.19-.061.385-.296.226-.273.463-.713.676-1.323.37-1.055.626-2.496.687-4.129H6.378zm5.048 0c-.061 1.771-.339 3.386-.772 4.624-.082.235-.171.46-.268.674a6.506 6.506 0 0 0 4.071-5.298h-3.03zm3.031-1.5a6.507 6.507 0 0 0-4.071-5.298c.097.214.186.44.268.674.433 1.238.711 2.853.772 4.624h3.031z"></path>
        </svg>
    );
};

const ChevronRight = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            className={`Svg-sc-ytk21e-0 kgVuXA IYDlXmBmmUKHveMzIPCF ${className}`}
            viewBox="0 0 16 16"
        >
            <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
        </svg>
    );
};

const ChevronLeft = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            className={`Svg-sc-ytk21e-0 kgVuXA IYDlXmBmmUKHveMzIPCF ${className}`}
            viewBox="0 0 16 16"
        >
            <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
        </svg>
    );
};

const PlayIcon = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`Svg-sc-ytk21e-0 iYxpxA ${className}`}
        >
            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
        </svg>
    );
};

const InstagramIcon = ({ width = 16, height = 16, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            data-encore-id="icon"
            className={`Svg-sc-ytk21e-0 hOjEcl ${className}`}
        >
            <path d="M8 1.44c2.136 0 2.389.009 3.233.047.78.036 1.203.166 1.485.276.348.128.663.332.921.598.266.258.47.573.599.921.11.282.24.706.275 1.485.039.844.047 1.097.047 3.233s-.008 2.389-.047 3.232c-.035.78-.166 1.204-.275 1.486a2.654 2.654 0 01-1.518 1.518c-.282.11-.706.24-1.486.275-.843.039-1.097.047-3.233.047s-2.39-.008-3.232-.047c-.78-.035-1.204-.165-1.486-.275a2.477 2.477 0 01-.921-.599 2.477 2.477 0 01-.599-.92c-.11-.282-.24-.706-.275-1.486-.038-.844-.047-1.096-.047-3.232s.009-2.39.047-3.233c.036-.78.166-1.203.275-1.485.129-.348.333-.663.599-.921a2.49 2.49 0 01.92-.599c.283-.11.707-.24 1.487-.275.843-.038 1.096-.047 3.232-.047L8 1.441zm.001-1.442c-2.172 0-2.445.01-3.298.048-.854.04-1.435.176-1.943.373a3.928 3.928 0 00-1.417.923c-.407.4-.722.883-.923 1.417-.198.508-.333 1.09-.372 1.942C.01 5.552 0 5.826 0 8c0 2.172.01 2.445.048 3.298.04.853.174 1.433.372 1.941.2.534.516 1.017.923 1.417.4.407.883.722 1.417.923.508.198 1.09.333 1.942.372.852.039 1.126.048 3.299.048 2.172 0 2.445-.01 3.298-.048.853-.04 1.433-.174 1.94-.372a4.087 4.087 0 002.34-2.34c.199-.508.334-1.09.373-1.942.039-.851.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.853-.174-1.433-.372-1.94a3.924 3.924 0 00-.923-1.418A3.928 3.928 0 0013.24.42c-.508-.197-1.09-.333-1.942-.371-.851-.041-1.125-.05-3.298-.05l.001-.001z"></path>
            <path d="M8 3.892a4.108 4.108 0 100 8.216 4.108 4.108 0 000-8.216zm0 6.775a2.668 2.668 0 110-5.335 2.668 2.668 0 010 5.335zm4.27-5.978a.96.96 0 100-1.92.96.96 0 000 1.92z"></path>
        </svg>
    );
};

const TwitterIcon = ({ width = 16, height = 16, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            data-encore-id="icon"
            className={`Svg-sc-ytk21e-0 hOjEcl ${className}`}
        >
            <path d="M13.54 3.889a2.968 2.968 0 001.333-1.683 5.937 5.937 0 01-1.929.738 2.992 2.992 0 00-.996-.706 2.98 2.98 0 00-1.218-.254 2.92 2.92 0 00-2.143.889 2.929 2.929 0 00-.889 2.15c0 .212.027.442.08.691a8.475 8.475 0 01-3.484-.932A8.536 8.536 0 011.532 2.54a2.993 2.993 0 00-.413 1.523c0 .519.12 1 .361 1.445.24.445.57.805.988 1.08a2.873 2.873 0 01-1.373-.374v.04c0 .725.23 1.365.69 1.92a2.97 2.97 0 001.739 1.048 2.937 2.937 0 01-1.365.056 2.94 2.94 0 001.063 1.5 2.945 2.945 0 001.77.603 5.944 5.944 0 01-3.77 1.302c-.243 0-.484-.016-.722-.048A8.414 8.414 0 005.15 14c.905 0 1.763-.12 2.572-.361.81-.24 1.526-.57 2.147-.988a9.044 9.044 0 001.683-1.46c.5-.556.911-1.155 1.234-1.798a9.532 9.532 0 00.738-1.988 8.417 8.417 0 00.246-2.429 6.177 6.177 0 001.508-1.563c-.56.249-1.14.407-1.738.476z"></path>
        </svg>
    );
};

const FacebookIcon = ({ width = 16, height = 16, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            data-encore-id="icon"
            className={`Svg-sc-ytk21e-0 haNxPq ${className}`}
        >
            <path d="M16 8a8 8 0 10-9.25 7.903v-5.59H4.719V8H6.75V6.237c0-2.005 1.194-3.112 3.022-3.112.875 0 1.79.156 1.79.156V5.25h-1.008c-.994 0-1.304.617-1.304 1.25V8h2.219l-.355 2.313H9.25v5.59A8.002 8.002 0 0016 8z"></path>
        </svg>
    );
};

const XIcon = ({ width = 16, height = 16, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={`Svg-sc-ytk21e-0 kPpCsU ${className}`}
        >
            <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z"></path>
        </svg>
    );
};

const ArrowDownIcon = ({ width = 16, height = 16, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={`Svg-sc-ytk21e-0 kPpCsU ${className}`}
        >
            <path d="M4.995 8.745a.75.75 0 0 1 1.06 0L7.25 9.939V4a.75.75 0 0 1 1.5 0v5.94l1.195-1.195a.75.75 0 1 1 1.06 1.06L8 12.811l-.528-.528a.945.945 0 0 1-.005-.005L4.995 9.805a.75.75 0 0 1 0-1.06z"></path>
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z"></path>
        </svg>
    );
};

const BellIcon = ({ width = 16, height = 16, className }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="currentColor"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            className={`Svg-sc-ytk21e-0 kPpCsU t93PZphItuM19kPhX7tC ${className}`}
            viewBox="0 0 16 16"
        >
            <path d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4zm-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569V5.5zm4.5 8a1 1 0 1 0 2 0H7z"></path>
        </svg>
    );
};

export {
    SpotifyLogo,
    HomeIcon,
    HomeIconActived,
    SearchIcon,
    SearchIconActived,
    LibraryIcon,
    PlusIcon,
    LanguageIcon,
    ChevronRight,
    ChevronLeft,
    PlayIcon,
    InstagramIcon,
    TwitterIcon,
    FacebookIcon,
    XIcon,
    ArrowDownIcon,
    BellIcon
};
