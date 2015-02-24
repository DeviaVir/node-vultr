test:
	node test/run all

single-test:
	node test/run grep $(TEST) --watch

.PHONY: test single-test