urlencode() {
    local LANG=C
    local string="$1"
    local encoded=""
    local i
    local c
    local code

    for ((i = 0; i < ${#string}; i++)); do
        c="${string:$i:1}"
        case "$c" in
            [a-zA-Z0-9.~_-]) encoded+="$c" ;;
            *) printf -v code '%02X' "'$c"
               encoded+="%$code" ;;
        esac
    done

    echo "$encoded"
}
