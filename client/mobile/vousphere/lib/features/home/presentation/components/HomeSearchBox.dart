import 'package:flutter/material.dart';

class HomeSearchBox extends StatelessWidget {
  const HomeSearchBox({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.fromLTRB(0, 12, 0, 4),
              filled: true,
              fillColor: Colors.blueGrey.withOpacity(0.06),
              hoverColor: Colors.transparent,
              focusColor: Colors.white,
              hintText: 'Search...',
              hintStyle: const TextStyle(color: Colors.blueGrey),
              prefixIcon: const Icon(
                Icons.search,
                color: Colors.blueGrey,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide.none,
              ),
              focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide(color: Colors.blue.shade700, width: 0.7)
              ),
            ),
          ),
        ),
      ],
    );
  }
}
