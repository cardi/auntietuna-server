#!/usr/bin/env python

import json
from pprint import pprint

with open('paypal.json') as f:
  data = json.load(f)

print("INSERT INTO auntietuna ( user, last_updated, domain, hashes ) "
      "VALUES (\"%s\", \"%s\", \"%s\", \"[%s]\");" %
      ("example_user",
      data[0]["last_updated"],
      data[0]["domain"],
      ', '.join(map(str, data[0]["hashes"])) ) )

print("INSERT INTO auntietuna ( user, last_updated, domain, hashes ) "
      "VALUES (\"%s\", \"%s\", \"%s\", \"[%s]\");" %
      ("example_user",
      data[0]["last_updated"],
      data[0]["domain"],
      'abcd, efgh'))
