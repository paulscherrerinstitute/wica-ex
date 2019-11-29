#!/bin/bash
while IFS= read -r line
do
    if [[ "$line" =~ .*\<\/defs\>.*$ ]]
    then
        cat $2 | egrep -v '<?xml|<svg|</svg>|<defs>|</defs>'
    fi
    if [[ "$line" =~ .*\<\/style\>.*$ ]]
    then
        cat $3
    fi
    echo "$line"
done < $1

