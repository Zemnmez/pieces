README.md: header.md $(wildcard */README.md)
	echo $(dir $(filter-out $<,$^)) | tr ' ' '\n' | sed 's/^.*$$/* (\0)[.\/\0]/g' | \
		cat header.md - > $@;