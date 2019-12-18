README.md: header.md $(wildcard */README.md)
	cat $(filter-out $<,$^) | sed 's/^#/##/g' | cat $< - > $@